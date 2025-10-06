const simpleOauthModule = require('simple-oauth2');

const oauth2 = simpleOauthModule.create({
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  },
});

module.exports = async (req, res) => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${process.env.URL}/api/callback`,
    scope: 'repo,user',
    state: Math.random().toString(36).substring(7),
  });

  res.writeHead(301, { Location: authorizationUri });
  res.end();
};
