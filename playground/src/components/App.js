import { defineNode, rerender } from '../../../src/index'
import Button from './Button'

const App = () => {
  const state = {
    count: 0,
    buttonMsg: 'qwe'
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

  const addBtnStyles = {
    minWidth: '40px',
    height: '30px',
    backgroundColor: 'green',
    padding: '5px 5px',
    border: 'none',
    marginBottom: '5px',
    borderRadius: '2px',
    cursor: 'pointer'
  }

  const render = () => [
    defineNode({
      el: 'div',
      styles: mainBlockStyles,
      content: [state.count]
    }),
    defineNode({
      el: 'button',
      content: ['+'],
      styles: addBtnStyles,
      events: [{ name: 'click', do: rise }]
    }),
    defineNode({
      el: 'div',
      content: [
        defineNode({
          el: 'button',
          content: ['+'],
          events: [{ name: 'click', do: rise }]
        }),
      ]
    }),
    defineNode({
      el: 'div',
      content: [
        defineNode({
          el: 'button',
          content: ['update'],
          events: [{ name: 'click', do: update }]
        })
      ]
    }),
    Button(state.buttonMsg),
    Button(state.buttonMsg)
  ]

  return {
    state,
    render
  }
}

export default App
