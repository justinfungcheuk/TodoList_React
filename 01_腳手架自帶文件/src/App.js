import logo from './logo.svg'; // 引入圖片，把圖片當作一個模塊引入
import './App.css';
/** App組件 */
function App() { // 函數定義的組件，要有返回值 return
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
// ES6的語法 export default 默認暴露