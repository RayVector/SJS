import { defineNode } from '../../../src/index'

const TodoItem = (item, click) => {

  const render = () => [
    defineNode({
      el: 'li',
      render: () => [`${item.id}) ${item.title}`],
      styles: {
        marginBottom: '10px',
        cursor: 'pointer'
      },
      events: [
        {
          name: 'click',
          do: () => click(item)
        }
      ]
    })
  ]

  return {
    render
  }
}

export default TodoItem
