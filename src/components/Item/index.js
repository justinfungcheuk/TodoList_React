import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

    // 當鼠標進來了，就要在狀態中維護一個變量，標識著鼠標有沒有在當前的 item 身上，把它稱為 mouse
    state = {mouse:false} // 而一上來的時候是 false， 代表沒有在任何東西的身上
    // 標識鼠標移入，移出

    // 所以當鼠標滑入到吃飯的位置，就會觸發 handleMouse，然後就會拿到 flag 值，因此需要更新狀態 this.setState({mouse:flag})

    // 鼠標移入，移出的回調
    // flag 區分鼠標是移入 還是 移出
    handleMouse = (flag)=>{
        // 在指定事件回調的時候，要保證該 {this.handleMouse(false)} 代碼的返回值是一個函數，所以要寫成以下高階函數返回值
        return ()=>{ // 當鼠標移入的時候， react 就會幫我們調用該函數 ()
            this.setState({mouse:flag}) // 更新狀態就可以標識到底鼠標是進來了還是沒有進來，進來就是 true，沒進來就是 flase
        }
    }

    // 勾選，或取消勾選某一個 todo 的回調
    handleCheck = (id)=>{
        return (event)=>{
            this.props.updateTodo(id,event.target.checked) // event.target.checked 表示當前要把值改成什麼
        }
    }

    // 響應刪除一個 todo 的回調
    handleDelete = (id)=>{ // 只要點擊刪除就輸出你的 id
        if(window.confirm('確定刪除嗎？')) // 告訴它是 window 身上的 confirm
        this.props.deleteTodo(id)
    }

    render() {
        const {id,name,done} = this.props
        const {mouse} = this.state
        return ( // done 是一個布爾值
            // onMouseLeace 鼠標離開， onMouseEnter 鼠標移入
            /* style={{backgroundColor:this.state.mouse ? '#ddd' : 'white'}}
               背景是什麼顏色呢？鼠標有沒有進來呢？ this.state.mouse 先用問號 ？ 問一下
               進來了是 #ddd 灰色， 沒進來是 white 白色
            */
                <li style={{backgroundColor:mouse ? '#ddd' : 'white'}} onMouseLeave={this.handleMouse(false)} onMouseEnter={this.handleMouse(true)}>
                <label>
                    {/* defaulChecked 表示一上來勾不勾選，後續是允許更改的 */}
                    <input type="checkbox" defaultChecked={done} onChange={this.handleCheck(id)}/> {/* 完成 或 沒完成 必須根據 布爾值done 來執行 */}
                    <span>{name}</span>
                </label>
                {/** display: 要加引號 '' 否則會觸發查找 none 的變量 */}
                <button onClick={()=> this.handleDelete(id)} className="btn btn-danger" style={{display:mouse?'block':'none'}}>删除</button>
                </li> // 不一定要寫高級函數 onClick={()=> this.handleDelete(id)}
        )
    }
}

// 一推的 todos 例如：吃飯，睡覺 是不能放到 List 裡面，因為放到 List 就實現不了用 Header 傳遞東西到 List
