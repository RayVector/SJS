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

  const updateButtonText = () => {
    state.buttonMsg = 'qweasdzxc'
    rerender(state, App)
  }

  const undoButtonText = () => {
    state.buttonMsg = 'qwe'
    rerender(state, App)
  }

  const computedCountTodos = () => {
    return state.count + state.todos.length
  }

  const onMounted = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
    state.todos = res.data.slice(0, 10)
    rerender(state, App)
  }

  const render = () => [
    defineNode({
      el: 'div',
      styles: {
        color: 'green',
        fontSize: '26px'
      },
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
          events: [{ name: 'click', do: updateButtonText }]
        }),
        defineNode({
          el: 'button',
          content: ['undo buttons text'],
          events: [{ name: 'click', do: undoButtonText }]
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
          content: [todo.title],
          styles: {
            marginBottom: '10px',
            cursor: 'pointer'
          },
          events: [{ name: 'click', do: () => alert(todo.title) }]
        })
      })]
    }),
    defineNode({
      el: 'div',
      styles: {
        fontSize: '26px'
      },
      content: [computedCountTodos()]
    }),
  ]

  return {
    state,
    render,
    onMounted
  }
}

export default App
