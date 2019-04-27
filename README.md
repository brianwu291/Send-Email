### `Project Structure`

This is a simple App build with Node.js and React.

```
├── README.md                    # 只是個 README.md
├── package.json                 # 這個 project的基本資訊
├── package-lock.json            # 儲存各種 package 的安裝版本套件資訊
│
├── index.js                     # App 的 entry point
│
├── /config
│     │
│     ├── dev.js(.gitignore)     # 儲存 dev 版本的認證資訊
│     │
│     ├── keys.js                # 引入 認證資訊 from dev.js and prod.js 並輸出
│     │      
│     └── prod.js                # 儲存 prod 版本的認證資訊
│
├── /middlewares                 # express 中的 middleware
│     │
│     ├── requireCredit.js       # 用戶想啟用調查服務，檢查金額是否足夠
│     └── requireLogin.js        # 檢查用戶是否登入
│
│
│
├── /modules
│      │
│      ├── Recipient.js          # 創建 recipient collection for survey collection
│      │
│      ├── survey.js             # 創建 survey collection in mondoDB
│      │
│      └── User.js               # 創建 user collection in mongoDB
│
│
│
│
├── /node_modules                # 後端套件 dependency
│
├── /routes
│      │
│      ├── authRoutes.js         # Handle 登入/出 or 註冊請求
│      │
│      ├── billingRoutes.js      # Handle stripe 刷卡付款請求
│      │
│      └── surveyRoutes.js       # handle 用戶使用調查服務請求
│
├── /services
│      │
│      └── passport.js           # 引入 passport lib, 操作登入驗證以及後續客戶資料處理
│
├── .gitignore                   # /node_modules, keys.js 不上傳敏感資料
│
└── /client
     │
     ├── /node_modules           # 前端套件 dependency
     │
     ├── /public
     │     │						 			
     │     └── index.html        # html templete
     │     
     ├── /src
     │     │
     │     ├── index.js          # App 前端 entry point
     │     ├── setupProxy.js     # 設定開發環境 前後端兩個server的proxy
     │     │
     │     ├── /components       # 儲存前端 react.js 所有元件
     │     ├── /actions          # Redux 系統中的 actionc 函數
     │     └── /reducers         # Redux 系統中的 reducer 函數
     │
     ├── package-lock.json       # 所有前端套件、dependency 安裝資訊
     │
     ├── package.json            # 運行環境、project 資訊
     │
     ├── .gitignore              # git 忽略的檔案			
     │
     └── README.md               # 前端架構詳細資訊
```
