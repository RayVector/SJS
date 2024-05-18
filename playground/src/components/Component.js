import {createState, node} from "../../../src";
import {createBtn} from "../../../src/interfaces/interfaces";

const Component = () => {
  const {state, setState} = createState({
    name: 'qwe'
  })

  const render = () => {
    return [
      createBtn('+', () => setState({name: 'asd'}, Component)),
      node({
        name: 'test',
        el: 'div',
        render: () => [[state.name]]
      }),
    ]
  }
  return {state, render}
}

export default Component