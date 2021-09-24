// index.js 是一個入口文件
import React from 'react'; // 引入 React 核心庫
import ReactDOM from 'react-dom'; // 引入 ReactDOM 
import './index.css'; // 引入 css 樣式
import App from './App'; // 引入 App 組件
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
<React.StrictMode> {/** <React.StrictMode 能夠檢查包裹在 App 以及 App裡面所有的子組件 寫的東西是否合理*/}
<App />
</React.StrictMode>,
document.getElementById('root') // 渲染 App 到頁面
);

// reportWebVitals();
