const jwt = require(`jsonwebtoken`);
const cookie = require(`cookie`);
const fs = require('fs');

const PORTAL_BACKEND_MARKER = 'PORTAL_BACKEND_MARKER';

const keycloakPubkeys = {
  prod: fs.readFileSync(__dirname + '/certs/keycloak.prod.cert', 'utf8'),
  stage: fs.readFileSync(__dirname + '/certs/keycloak.stage.cert', 'utf8'),
  qa: fs.readFileSync(__dirname + '/certs/keycloak.qa.cert', 'utf8'),
};

const buildUser = (input) => {
  const user = {
    entitlements: {
      insights: { is_entitled: true },
      smart_management: { is_entitled: true },
      openshift: { is_entitled: true },
      hybrid: { is_entitled: true },
      migrations: { is_entitled: true },
      ansible: { is_entitled: true },
    },
    identity: {
      account_number: input.account_number,
      type: 'User',
      user: {
        username: input.username,
        email: input.email,
        first_name: input.first_name,
        last_name: input.last_name,
        is_active: true,
        is_org_admin: input.is_org_admin,
        is_internal: input.is_internal,
        locale: input.locale,
      },

      internal: {
        org_id: input.account_id,
      },
    },
  };

  return user;
};

const envMap = {
  ci: {
    keycloakPubkey: keycloakPubkeys.qa,
    target: 'https://ci.cloud.redhat.com',
    str: 'ci',
  },
  qa: {
    keycloakPubkey: keycloakPubkeys.qa,
    target: 'https://qa.cloud.redhat.com',
    str: 'qa',
  },
  stage: {
    keycloakPubkey: keycloakPubkeys.stage,
    target: 'https://cloud.stage.redhat.com',
    str: 'stage',
  },
  prod: {
    keycloakPubkey: keycloakPubkeys.prod,
    target: 'https://cloud.redhat.com',
    str: 'prod',
  },
};

const authPlugin = (req, res, target) => {
  let env = envMap.prod;

  switch (req.headers['x-spandx-origin']) {
    case 'ci.foo.redhat.com':
      env = envMap.ci;
      break;
    case 'qa.foo.redhat.com':
      env = envMap.qa;
      break;
    case 'stage.foo.redhat.com':
      env = envMap.stage;
      break;
    case 'prod.foo.redhat.com':
      env = envMap.prod;
      break;
    default:
      env = false;
  }

  if (target.includes(PORTAL_BACKEND_MARKER)) {
    target = target.replace(PORTAL_BACKEND_MARKER, env.target);
    console.log(`    --> mangled ${PORTAL_BACKEND_MARKER} to ${target}`);
  }

  const noop = {
    then: (cb) => {
      cb(target);
    },
  };
  if (!req || !req.headers || !req.headers.cookie) {
    return noop;
  } // no cookies short circut

  const cookies = cookie.parse(req.headers.cookie);
  if (!cookies.cs_jwt) {
    return noop;
  } // no rh_jwt short circut

  return new Promise(function (resolve) {
    jwt.verify(cookies.cs_jwt, env.keycloakPubkey, {}, (err, decoded) => {
      if (err) {
        resolve(target);
        return;
      } // silently miss on error

      const user = buildUser(decoded);
      const unicodeUser = new Buffer(JSON.stringify(user), 'utf8');
      req.headers['x-rh-identity'] = unicodeUser.toString('base64');
      resolve(target);
    });
  });
};

module.exports = {
  routerPlugin: authPlugin,
  open: !true,
  startPath: '/',
  verbose: true,
  bs: {
    notify: false,
    https: {
      key: __dirname + '/ssl/key.pem',
      cert: __dirname + '/ssl/cert.pem',
    },
  },
  esi: {
    allowedHosts: [/^https:\/\/.*cloud.redhat.com$/],
  },
  host: {
    'ci.foo.redhat.com': 'ci.foo.redhat.com',
    'qa.foo.redhat.com': 'qa.foo.redhat.com',
    'stage.foo.redhat.com': 'stage.foo.redhat.com',
    'prod.foo.redhat.com': 'prod.foo.redhat.com',
  },
  port: 1337,
  routes: {
    '/': { host: PORTAL_BACKEND_MARKER }
  },
};