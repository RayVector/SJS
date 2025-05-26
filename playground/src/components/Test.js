import {createState, node} from "../../../src";
import {createBtn} from "../../../src/interfaces/interfaces";

const Test = (title) => {
  const {state, setState} = createState({
    isToggle: false
  }, Test)

  const render = () => [
    node({
      el: 'div',
      render: () => [state.isToggle]
    }),
    createBtn('Switch', () => setState({isToggle: !state.isToggle})),
  ]

  return {
    state,
    render,
  }
}

export default Test
