import React, { Component } from 'react'
import './index.css'


/**
 * 我們的代碼已經獲得了 todos 這堆數組，而我們要做的就是 - 對數據進行條件統計，
 * 而什麼是 - 條件統計呢？
 * 就是當 done值 為 true，就統計一下 +1，如果再出現 done值 為 true 就再 +1，
 * 所以我們要做的就是得到該數組一共有多少個對象，它的 done值 為 true，
 * 而我們應該怎麼做數據的統計呢？
 * 在數組身上有一個方法是 reduce，專門用於做統計的。 
 * reduce的作用：
 * 1. 對數組進行條件統計
 * 2. 條件求和 等等
 */
export default class Footer extends Component {
    // 當你在 App組件完成的傳遞給 Footer 的 checkAllTodo，就可以直接接收它 this.props.checkAllTodo()

    // 全選 checkBox 的回調
    // 定義 handleCheckAll 該函數，用箭頭語句 加 箭頭函數
    handleCheckAll = (event)=>{ // 要把 done值 全部調為 true，才能做到全部完成的勾選框
        /* 我們要知道全選還是全不選，要看該代碼 <input type="checkbox" onChange={this.handleCheckAll} 是勾選全選，還是沒有勾選全選，
           而該勾選就在 event，因為我們給 input 加了 onChange，
           所以我們要知道到底是全勾選，還是沒有全勾選 input，就可以借助 event。
        */

        this.props.checkAllTodo(event.target.checked) // 要知道 全選 還是 全不選，就是在 input節點 裡面是勾選還是不勾選選框， 需要加上 event
        // event.target.checked 可以識別出到底 勾選還是不勾選選框，而且 vent.target.checked 的值，它是一個布爾值
        // 最後我們就可以把它傳遞到 App組件的 checkAllTodo 的 done值裡面，因此是全選 還是 全不選 就是聽從 done， checkAllTodo = (done) 

        // 因為我們給 input 裡面加上 onChange，而我們想要拿到誰 勾選還是不勾選 input，我們可以借助 event
    }

    // 清除已完成任務的回調
    handleClearAllDone = ()=>{ // 要告訴 App 所有 done屬性 為 true 的 todoObj 刪除
        this.props.clearAllDone() 
    }

    render() {
        const {todos} = this.props // 我們可以根據 todos 就能夠計算出來有多少個項目已經完成的，以及總數是多少
        // 已完成的個數 doneCount- .reduce 可以對數據進行：條件統計 / 條件求和 / 
        const doneCount = todos.reduce((pre,todo)=>{return pre + (todo.done ? 1 : 0)},0) // todo.done 代表這事情完成了嗎？完成了 +1，沒完成 +0
        /* todos是一個數組，我們要調用 reduce，而 reduce 要傳一個回調 （和 map 或 filter 一樣），
           .reduce 在調用的時候，可以傳入 2個參數：第一個參數是回調，第二個參數是在做統計時的初始值（初始值剛開始是 0），
           reduce 所調用的 2個參數，一個是 pre 代表之前的值，一個是 current
        */

        /*
        // 0 代表你在做統計的時候，剛開始為 0，pre 就是之前做統計的值
        // pre 是 (pre,current)=>{}) 該函數的上一次的返回值，而第一次調用的時候，由於沒有上一次，就以傳遞的 0 為主
        // current 是第二次調用的時候，就是該函數 (pre,current)=>{}) 第一次調用的返回值
        // current 是什麼呢？ 由於是對 todos 做遍歷，所以拿到的 current 就是每一個一個的 todo
           在這裡我們方便理解把 current 換成 todo

           當第一次調用該函數 (pre,current)=>{}) 的時候，由於沒有上一次，所以 pre 傳的是 0
           {return pre + 1}，所以當 pre 是 0，就會返回 0+1=1，因此當你 return返回 了，
           在第二次調用該函數的時候，pre 就會變成 1，因為剛才已經把 1 返回了，所以當你 return返回 的時候，1+1=2，
           因此，當你整個 todos.reduce((pre,todo)=>{return pre + 1 },0)  代碼都執行完了，
           doneCount 就計算出總數。
           但是我們不能寫 +1，會把代碼寫死，只計算了數組的長度。


           要有返回值 (return pre + (todo.done ? 1 : 0)，代表了當 todo 完成了就 + 1, 沒完成就 + 0
        */

        /* 而由於回調函數的箭頭函數的函數體可以只需要一句語法來完成默認return，
        可以直接寫成：const doneCount = todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0)},0)
        */
        



        // 總數 total
        const total = todos.length // todos.length 代表 todos 該數組的長度
        return (
                <div className="todo-footer">
                <label>
                {/** 當 doneCount ==== total 時就勾選全部完成的勾選框，否則則不勾選
                 *   而由於 defaultChecked 只能在頁面上來使用一次才有作用，往後再就無效了，所以要使用 checked 來檢查項目是否全部完成來勾選選框
                 *   而且在 React，如果你使用 checked， 就必須要透過 onChange 來做勾選還是取消勾選時做回調，否則就會把代碼寫死
                 *   
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
