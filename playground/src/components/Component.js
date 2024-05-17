import {createState, node} from "../../../src";
import {createBtn} from "../../../src/engine/engine";

const Component = () => {
  const name = 'Component'

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
  return {name, state, render}
}

export default Component