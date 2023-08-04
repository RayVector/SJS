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

  const render = (s) => [
    defineNode({
      el: 'div',
      content: [s.count]
    }),
    defineNode({
      el: 'button',
      content: ['+'],
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
