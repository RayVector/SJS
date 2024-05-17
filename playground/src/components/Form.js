import {createState, node} from "../../../src";
import {onChange} from "../../../src/enum/actions";
import {createContainer} from "../../../src/engine/engine";

const Form = () => {
  const name = 'Form'

  const {state, setState} = createState({
    name: ''
  })

  const render = () => {
    return [
      node({
        el: 'form',
        render: () => [
          // createContainer([state.name || 'No data']),
          node({
            name: 'test',
            el: 'div',
            render: () => {
              // console.log(1, state)
              return [state.name || 'No data']
            }
          }),
          createContainer([
            node({
              el: 'label',
              render: () => [
                'Name',
                node({
                  el: 'input',
                  styles: {marginLeft: '10px'},
                  events: [
                    // [onInput, (e) => console.log('onInput: ', e.target.value)],
                    [onChange, (e) => setState({name: e.target.value}, Form)]
                  ]
                })
              ]
            })
          ])
        ]
      })
    ]
  }
  return {name, state, render}
}

export default Form