import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {

    // 對接收的 props 進行：類型，必要性的限制
    static propTypes = {
        todos:PropTypes.array.isRequired,
        updateTodo:PropTypes.func.isRequired,
        deleteTodo:PropTypes.func.isRequired
    }


    render() {
        // const {} 裡面的中括號取決於你在 App 裡面傳什麼就取出什麼，所以是 todos
        const {todos, updateTodo, deleteTodo} = this.props
        return (
            <ul className="todo-main">
                { // 拿到的每一個要做的項目是 (todo)
                // 而 todos 是一個數組，則存儲了一堆要做的事
                    todos.map (todo =>{
                        // 每一個 todo 都有自身的 id
                        // return <Item key={todo.id} id={todo.id} name={todo.name} done={this.done}/> 換成下面的批量傳遞
                        return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/> // {...todo} 批量把東西傳進去
                        // 因為 updateTodo 是從外面接過來的， 所以不用加上 this
                        // updateTodo 傳給了 Item
                    })
                }         
            </ul>
        )
    }
}
