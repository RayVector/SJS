import { defineNode } from '../../../src/index'
import {addBtnStyles} from '../styles/btn'

const Button = (msg = '') => {

  const render = () => [
    defineNode({
      el: 'button',
      render: () => [msg],
      styles: {
        ...addBtnStyles,
        marginRight: '5px',
        marginTop: '5px'
      },
      events: [
        {
          name: 'click',
          do: () => alert(msg)
        }
      ]
    })
  ]

  return {
    render
  }
}

export default Button
