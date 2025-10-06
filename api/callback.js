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
  const { code } = req.query;

  try {
    const result = await oauth2.authorizationCode.getToken({
      code,
      redirect_uri: `${process.env.URL}/api/callback`,
    });

    const token = oauth2.accessToken.create(result);

    const content = `
      <html>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                console.log("receiveMessage %o", e);
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify({
                    token: token.token.access_token,
                    provider: 'github'
                  })}',
                  e.origin
                );
              }
              window.addEventListener("message", receiveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
            })();
          </script>
        </body>
      </html>
    `;

    res.send(content);
  } catch (error) {
    console.error('Access Token Error', error.message);
    res.status(500).json('Authentication failed');
  }
};
