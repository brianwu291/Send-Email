// 既然是扮演middleware的函數，接受req, res兩個參數，next則是在handle完req, res之後，
// 會執行的callback function。
// 這個next不只用在傳給routes，也可以用在傳給‘下一個’middleware，不斷串連直到處理結束
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(403).send({ error: 'You should login in first!' });
  }
  next();
};
