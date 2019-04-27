const keys = require('../config/keys.js');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin.js');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // 第二個參數是middleware，在一切之前先判斷這個req的用戶是否已經登入
    // 原本這裡的 create() 第二個參數是一個 callback func(因為是送給 stripe 的非同步請求)，
    // 但 stripe 寫好整個函數，讓我們在第一個參數直接使用 promise().then()
    // 這裡乾脆就用 es7 syntax async await
    // stripe.charges.create() 會回傳一個代表 ‘交易(charge)’的物件
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    //在使用passport的情況下，可以寫req.user取得當前的user module(因為有請passport存在cookie)
    //這裡意思是：取得現在的user module，給它一個credit property，並新增5元
    req.user.credits += 5;
    //然後存回mongoDB，是一個非同步，所以使用 async await
    const user = await req.user.save();
    // 傳回前端
    res.send(user);
  });
};
