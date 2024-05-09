import { node } from '../../../src/index'
import {onClick} from "../../../src/enum/actions";

const TodoItem = (item, click) => {

  const render = () => [
    node({
      el: 'li',
      render: () => [`${item.id}) ${item.title}`],
      styles: {
        marginBottom: '10px',
        cursor: 'pointer'
      },
      events: [
        [onClick, () => click(item)]
      ]
    })
  ]

  return {
    render
  }
}

export default TodoItem
