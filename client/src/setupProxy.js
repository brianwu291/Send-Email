const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  // 為了開發版本，有兩個server的溝通。
  app.use(
    proxy('/auth/google', { target: 'http://localhost:5000' })
  );

  // 為了開發版本，判斷用戶是否已登入。 /api/* means anything
  app.use(
    proxy('/api/*', { target: 'http://localhost:5000' })
  );
  app.use(
    proxy("/api/surveys/thanks", { target: "http://localhost:5000" })
  );
}
