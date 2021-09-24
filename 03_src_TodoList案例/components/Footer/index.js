import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
    // 全選 checkBox 的回調
    // 定義 handleCheckAll 該函數，用箭頭語句 加 箭頭函數
    handleCheckAll = (event)=>{ // 要把 done值 全部調為 true，才能做到全部完成的勾選框
        this.props.checkAllTodo(event.target.checked) // 要知道 全選 還是 全不選，就是在 input節點 裡面是勾選還是不勾選選框， 需要加上 event
        // event.target.checked 可以識別出到底 勾選還是不勾選選框，而且 vent.target.checked 的值，它還是一個布爾值
        // 最後我們就可以把它傳遞到 App組件的 checkAllTodo 的 done值裡面

        // 因為我們給 input 裡面加上 onChange，而我們想要拿到誰 勾選還是不勾選 input，我們可以借助 event
    }

    // 清除已完成任務的回調
    handleClearAllDone = ()=>{
        this.props.clearAllDone()
    }

    render() {
        const {todos} = this.props // 我們可以根據 todos 就能夠計算出來有多少個項目已經完成的，this.props 以及總數是多少
        // 已完成的個數 - .reduce 可以對數據進行：條件統計 / 條件求和 / 
        const doneCount = todos.reduce((pre,todo)=>{return pre + (todo.done ? 1 : 0)},0) // .reduce 在調用的時候，可以傳入 2個參數：第一個參數是回調，第二個參數是在做統計時的初始值
        // 0 代表你在做統計的時候，剛開始為 0
        // pre 是 (pre,current)=>{},0) 該函數的上一次的返回值，而第一次調用的時候，由於沒有上一次，就以傳遞的 0 為主
        // current 是第二次調用的時候，就是該函數 (pre,current)=>{},0) 第一次調用的返回值
        // current 是什麼呢？ 由於是對 todos 做遍歷，所以拿到的 current 就是每一個一個的 todo
        // 在這裡我們方便理解把 current 換成 todo

        // 要有返回值 (return pre + (todo.done ? 1 : 0)，代表了當 todo 完成了就 + 1, 沒完成就 + 0
        /* 而由於回調函數的箭頭函數的函數體可以只需要一句語法來完成默認return，
        可以直接寫成：const doneCount = todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0)},0)
        */
        



        // 總數
        const total = todos.length // todos.length 代表 todos 該數組的長度
        return (
                <div className="todo-footer">
                <label>
                {/** 當 doneCount ==== total 時就勾選全部完成的勾選框，否則則不勾選
                 *   而由於 defaultChecked 只能在頁面上來使用一次才有作用，往後再就無效了，所以要使用 checked 來檢查項目是否全部完成來勾選選框
                 *   而且在 React，如果你使用 checked， 就必須要透過 onChange 來做勾選還是取消勾選時做回調，否則就會把代碼寫死
                 */}
                <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true : false }/>
                {/** 由於不能只能說 doneCount === total 相等了就直接勾選選框，還要有額外條件：要它倆相等的同時還要總數不能等於 0，否則它會在總數是 0 和已完成也是 0 的時候也勾選選框  */}
                </label>
                <span>
                <span>已完成{doneCount}</span> / 全部{total}
                </span>
                <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}
