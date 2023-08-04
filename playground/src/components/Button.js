import { defineNode } from '../../../src/index'

const Button = (msg = '') => {
  const btnStyles = {
    minWidth: '40px',
    height: '30px',
    backgroundColor: 'green',
    padding: '5px 5px',
    border: 'none',
    marginBottom: '5px',
    marginRight: '5px',
    marginTop: '5px',
    borderRadius: '2px',
    cursor: 'pointer'
  }

  const render = () => [
    defineNode({
      el: 'button',
      content: [msg],
      styles: btnStyles,
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
