import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item' // Item 是 List 裡面的子組件，所以要引入 Item
import './index.css'

export default class List extends Component {

    // 對接收的 props 進行：類型，必要性的限制
    static propTypes = {
        todos:PropTypes.array.isRequired, // todos 是一個數組
        updateTodo:PropTypes.func.isRequired, // updateTodo 是函數
        deleteTodo:PropTypes.func.isRequired // deleteTodo 是函數
    }


    render() {
        // const {} 裡面的中括號取決於你在 App 裡面傳什麼就取出什麼，所以是 todos
        const {todos, updateTodo, deleteTodo} = this.props  // 由父組件給 List 傳遞東西，所以要用 this.props
        /* 由 App組件所傳遞過來的 updateTodo 不是給 List組件用的，而是給 Item組件 用的，
           所以要把 updateTodo 寫到 item裡面，<Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/> ，
           而由於 updateTodo 不是定義在 List組件 裡面的東西，而是從外面的 App組件 所接收過來的，所以不要加上 this.updateTodo。
        */

        /* 我們要把 todos 傳遞給展示的組件 例如：<List todos={todos} />，
           而且當你把 todos傳遞給了 List組件，就要在 List組件 裡面接上 todos，<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
         */
        return (
            <ul className="todo-main">
                { // 拿到的每一個要做的項目是 (todo)
                // 而 todos 是一個數組，則存儲了一堆要做的事
                    todos.map (todo =>{ 
                        /* 我們有多少個 item，要視乎有多少個 todos 要做，也就是 todos 這個數組的長度，決定我們要渲染多少個 item，
                        因為我們已經拿到了 todos， const {todos, updateTodo, deleteTodo} = this.props，
                        而要拿到每一個 todo 就要用遍歷方法 todos.map(todo=>{return <Item key={todo.id}/>})

                        而因為是遍歷的原因，必須要有 key的存在，而且因為每一個 todo 都有自身的標識 id，我們不要index，所以要用 key={todo.id}
                        因為我們 App 裡面有4個要做的事情，所以會渲染出 4個item的組件。
                        */

                        // 
                        // 每一個 todo 都有自身的 id
                        // return <Item key={todo.id} id={todo.id} name={todo.name} done={this.done}/> 換成下面的批量傳遞
                        return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/> // {...todo} 批量把 todo項目的 id，name 和 done，傳進去
                        // return <Item key={todo.id} id={todo.id} name={todo.name} done={this.done}/> 該寫法和 return <Item key={todo.id} {...todo} /> 效果一樣，但該寫法不夠效率
                        // 因為 updateTodo 是從外面接過來的， 所以不用加上 this
                        // updateTodo 傳給了 Item
                    })
                }         
            </ul>
        )
    }
}
