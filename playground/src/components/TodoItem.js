import { defineNode } from '../../../src/index'

const TodoItem = (todo = {}) => {

  const render = () => [
    defineNode({
      el: 'li',
      render: () => [`${todo.id}) ${todo.title}`],
      styles: {
        marginBottom: '10px',
        cursor: 'pointer'
      },
      events: [
        {
          name: 'click',
          do: () => {}
        }
      ]
    })
  ]

  return {
    render
  }
}

export default TodoItem
