This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `App Structure`

```
/client
 │
 ├── /node_modules				          # 前端套件 dependency
 │ 
 ├── /public							 			
 │		└── index.html 		            # html templete 
 │     
 ├── /src 								   
 │		├── index.js 		              # App 前端 entry point
 │		├── setupProxy.js 		        # 設定開發環境 前後端兩個server的proxy
 │		│
 │		├── /components			          # 儲存前端 react.js 所有元件
 │    │    │
 │		│    ├── /custtomcss			  	# 所有元件 css 檔案
 │	  │		 ├── App.js 						  # 負責 Wrap 所有元件
 │    │    ├── Header.js            # 網頁最上方 Header 元件
 │		│
 │		│
 │    │
 │		├── /actions  				        # Redux 系統中的 actionc 函數
 │    │    │
 │		│    ├── actionType.js 			  # 輸出替代字串的變數，防止typo
 │    │	   └── index.js 						# 創髒 action 的函數，負責產出新 state 的起點(api呼叫等)
 │    │
 │    │
 │		└── /reducers 				        # Redux 系統中的 reducer 函數
 │         │
 │				 ├── authReducer.js  			# 負責處理登入認證的相關 state 
 │				 ├── surveyReducer.js     # 負責處理用戶查詢結果的相關 state
 │				 └── index.js 						# 把所有 reducer 函數包一起引到 redux-store 中成為 props
 │
 │
 │
 │	 
 ├── package-lock.json 			        # 所有前端套件、dependency 安裝資訊
 │
 ├── package.json 					        # 運行環境、project 資訊
 │
 ├── .gitignore 						        # git 忽略的檔案			
 │
 └── README.md 							        # 前端架構詳細資訊

```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).