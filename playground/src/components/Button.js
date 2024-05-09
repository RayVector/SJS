import { node } from '../../../src/index'
import {addBtnStyles} from '../styles/btn'
import {onClick} from "../../../src/enum/actions";

const Button = (msg, slot) => {

  const render = () => [
    slot,
    node({
      el: 'button',
      render: () => [msg],
      styles: {
        ...addBtnStyles,
        marginRight: '5px',
        marginTop: '5px'
      },
      events: [[onClick, () => alert(msg)]]
    })
  ]

  return {
    render
  }
}

export default Button
