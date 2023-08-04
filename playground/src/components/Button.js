import { defineNode } from '../../../src/index'

const Button = (msg = '') => {
  const render = () => [
    defineNode({
      el: 'button',
      content: [msg],
      events: [
        {
          name: 'click',
          do: () => alert(123)
        }
      ]
    })
  ]

  return {
    render
  }
}

export default Button
