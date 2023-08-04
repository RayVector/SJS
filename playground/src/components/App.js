import axios from 'axios'

import { defineNode, rerender } from '../../../src/index'

import Button from './Button'
import { addBtnStyles } from '../styles/btn'

const App = () => {
  const state = {
    count: 0,
    buttonMsg: 'qwe',
    todos: []
  }

  const rise = () => {
    state.count++
    rerender(state, App)
  }

  const update = () => {
    state.buttonMsg = 'qweasdzxc'
    rerender(state, App)
  }

  const mainBlockStyles = {
    color: 'green',
    fontSize: '26px'
  }

  const onMounted = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
    state.todos = res.data.slice(0, 10)
    rerender(state, App)
  }

  const render = () => [
    defineNode({
      el: 'div',
      styles: mainBlockStyles,
      content: [state.count]
    }),
    defineNode({
      el: 'div',
      styles: {
        marginBottom: '5px',
      },
      content: [
        defineNode({
          el: 'button',
          content: ['+'],
          styles: addBtnStyles,
          events: [{ name: 'click', do: rise }]
        }),
      ]
    }),
    defineNode({
      el: 'div',
      content: [
        defineNode({
          el: 'button',
          content: ['update buttons text'],
          events: [{ name: 'click', do: update }]
        })
      ]
    }),
    Button(state.buttonMsg),
    Button(state.buttonMsg),
    defineNode({
      el: 'div',
      content: [...state.todos.map(todo => {
        return defineNode({
          el: 'li',
          content: [todo.title]
        })
      })]
    })
  ]

  return {
    state,
    render,
    onMounted
  }
}

export default App
