import { defineNode } from '../../../src/index'
import {addBtnStyles} from '../styles/btn'

const Button = (msg, slot) => {

  const render = () => [
    slot,
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
    render,
    slot: (e) => {
      console.log(1, e)
      return Button
    }
  }
}

export default Button
