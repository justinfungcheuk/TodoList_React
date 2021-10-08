import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

    // 當鼠標進來了，就要在狀態中維護一個變量，標識著鼠標有沒有在當前的 item 身上，把它稱為 mouse
    state = {mouse:false} // 而一上來的時候是 false， 代表沒有在任何東西的身上
    // 標識鼠標移入，移出

    // 所以當鼠標滑入到吃飯的位置，就會觸發 handleMouse，然後就會拿到 flag 值，因此需要更新狀態 this.setState({mouse:flag})

    // 鼠標移入，移出的回調
    // flag 區分鼠標是 移入 還是 移出
    handleMouse = (flag)=>{ // 定義 handleMouse 賦值語句 加 箭頭函數
        // 在指定事件回調的時候，如果你寫上小括號()調用，要保證該 {this.handleMouse(true)} 代碼的返回值是一個函數，所以要寫成以下高階函數返回值 return
        return ()=>{ // 當鼠標移入的時候， react 就會幫我們調用該函數 ()=>{}
            /* 因此，當鼠標進來 List 裡面的其中一個 item裡面，就要在狀態中維護一個變量，標識著鼠標到底有沒有在當前這個 item 身上，
            所以，我們要寫上 state = {mouse:false}，而因為鼠標一開始的時候，是沒有在任何的 item 身上的，所有要定義為 false！！！！！
            當鼠標移動到其中一個 item 身上，就會觸發 handleMouse，就會拿到一個 flag值，所以我們要更新狀態，寫上 this.setState({mouse:flag})
            this.setState({mouse:flag})，可以標識鼠標進來還是沒有進來 item 身上。進來就會把flag 變成 mouse:true， 沒進來就把flag變成 mouse:false
            */

            this.setState({mouse:flag}) // 更新狀態就可以標識到底鼠標是進來了還是沒有進來，進來就是 true，沒進來就是 flase
        }
    }

    // 勾選，或取消勾選某一個 todo 的回調
    handleCheck = (id)=>{
        return (event)=>{ // 如果是勾選的時候，react 就會幫我們調用該 return 函數 ()=>{}，而我們勾選的是 input 所展示出來的 checkbox
            // 我們給 input 綁定了 onChange，而我們想拿到 input 的值，所以它們倆是屬於同一個東西，所以可以借助 event
            this.props.updateTodo(id,event.target.checked) // event.target.checked 表示當前要把值改成 true 還是 false = 也就是勾選框是 勾選了 還是 沒有被勾選
            // 由於 input 的類型已經改為 type="checkbox" 所以我們不能再拿 value值 （也就是不能再用 event.target.value），而是使用 event.target.checked，代表是否勾選
        }
    }

    // 刪除一個 todo 的回調 - 給每一個 todo 綁定一個刪除事件
    handleDelete = (id)=>{ // 只要點擊刪除就輸出你的 id
        if(window.confirm('確定刪除嗎？')) // 告訴它是 window 身上的 confirm，讓 confirm 達成可以彈出確定和取消的選擇按鈕
        // confirm 調用之後它有一個返回值，當點擊確定就返回 true，點擊取消就返回 false
        this.props.deleteTodo(id)
    } // 子組件想影響父組件的狀態，就需要父組件當年要傳遞給 item 的一個刪除 todo 的方法

    render() {
        const {id,name,done} = this.props // 因為在 List組件，我們傳遞了 id，name 和 done，所以我們要接上 const {id,name,done} = this.props
        /**
         * 而在拿到 name，我們是要做展示任務名稱
         * 而拿到 done 就是決定該 item 勾選還是不勾選
         */

        const {mouse} = this.state // 先讀取 mouse，就可以直接把下面的 backgroundColor:this.state.mouse 寫成 backgroundColor:mouse
        return ( // done 是一個布爾值
            // onMouseLeave 鼠標離開， onMouseEnter 鼠標移入
            /* style={{backgroundColor:this.state.mouse ? '#ddd' : 'white'}}
               背景是什麼顏色呢？鼠標有沒有進來呢？ this.state.mouse 先用問號 ？ 問一下
               進來了是 #ddd 灰色， 沒進來是 white 白色

               因為 li 代表每一個 item（也就是代表每一個 todo對象 = todoObj），
            */
                <li style={{backgroundColor:mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)} >
                <label>
                    {/* defaulChecked 表示在“第一次”一上來勾不勾選，後續是允許更改的
                    但是直接寫 checked={done} 會把代碼寫死，我們要更改的話，必須要加上 onChange

                    當勾選了某個 item，代表必須要拿到所勾選的 id，然後通知 app組件，你把某個 id 的那個任務名稱的狀態更改為 true，代表該 item 已經完成了
                    所以，當你勾選或不勾選，必須要拿到該 item 的 id 和 該 item 的勾選框是 勾選或不勾選，
                    因此，我們要使用 nChange={this.handleCheck(id)}，來決定勾選框
                    */}
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/> {/* 完成 或 沒完成 必須根據 布爾值done 來執行 */}
                    <span>{name}</span> {/** 把 name 傳到這裡，就是把你的 todo 裡面的 name 渲染到頁面 */}
                </label>
                {/** 當鼠標進來到 item 身上，就不可以隱藏，只寫 style={{display:'none'}}，要寫成 style={{display:mouse?'block':'none'}}，當鼠標移走了才隱藏，
                 * 當鼠標放到誰的身上，那一個 item 就會有高亮的效果，並且後面的刪除按鈕也會一同出現，
                 * display: 要加引號 '' 否則會觸發查找 none 的變量 
                 * */}
                <button onClick={()=> this.handleDelete(id)} className="btn btn-danger" style={{display:mouse?'block':'none'}}>删除</button>
                </li> // 不一定要寫高級函數 onClick={()=> this.handleDelete(id)}
                /**
                 * onClick={()=> this.handleDelete(id)} 當中的 his.handleDelete()是響應刪除回調，
                 * 直接拿到現在操作的 id，然後告訴 App 把這個項目刪除就可以，所以刪除只要拿到 id 就可以，不用拿別的。
                 * 因此要在 this.handleDelete(id) 裡面加上 id。
                 * 
                 * 不一定要寫高級函數！
                 * 因為 onClick 需要指定一個回調， ()=>{} 這就是回調的寫法，而 React 在發生點擊的時候，就會幫我們調用該函數 ()=>{}
                 * 而 onClick={()=>}} 的 button 沒有值，我們不用在函數裡面 (event)=>{} 接 event，
                 * 我們可以直接調用 this.handleDelete(id) 到函數裡面，onClick={()=> this.handleDelete(id)，我們自己去調用 handleDelelte
                 */
        )
    }
}

// 一推的 todos 例如：吃飯，睡覺 是不能放到 List 裡面，因為放到 List 就實現不了用 Header 傳遞東西到 List


/* 在 item 裡面，通知最外則的 App組件 更新指定 id 的 todo （也就是代表 子組件操作父組件 = 通過 item 影響 App組件 裡面的狀態發生改變）
   如果要通過 item 影響 App組件 裡面的狀態發生改變，就要 App組件當年要給 item 傳遞一個函數，就等於你所 添加的一個 todo 是同一個道理。

   但是由於 App組件 和 Item組件 它們之間是一個祖孫的關係，所以要先透過 App組件 給 List子組件 傳遞一個函數，能夠更新裡面指定 id 的 todo 對象，但是 List 不用它，
   然後，直接傳遞給 Item，在 Item 裡面合適的時候 props 一調用，就會影響 App組件裡面的東西，發生變化。
*/

