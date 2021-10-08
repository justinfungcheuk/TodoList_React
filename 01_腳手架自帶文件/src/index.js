// index.js 是一個入口文件，並不是一個 index組件
import React from 'react'; // 引入 React 核心庫
import ReactDOM from 'react-dom'; // 引入 ReactDOM 
import './index.css'; // 引入 css 樣式
import App from './App'; // 引入 App 組件
// import reportWebVitals from './reportWebVitals';
// reportWebVitals 該文件是用於記錄頁面上的性能的，當頁面出來了就可以記錄它的性能是怎麼樣的，可以做一些分析，透過 reportWebVitals文件裡面的 web-vitals 來做頁面的檢測

ReactDOM.render( // 渲染 App組件
<React.StrictMode> 
{/** <React.StrictMode 能夠檢查包裹在 App 以及 App裡面所有的子組件 寫的東西是否合理, 例如：如果你在 App組件 裡面寫了 ref="demo" 就會出現警告，因為該寫法已經棄用了*/}
<App />
</React.StrictMode>,
document.getElementById('root') // 渲染 App.js組件 到頁面
); // root 就會自動在 public文件 找到 index.html 裡面的 root

// reportWebVitals();
