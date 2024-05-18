import {createState, node} from "../../../src";
import {onInput, onChange} from "../../../src/enum/actions";
import {createContainer} from "../../../src/engine/engine";

const Form = () => {
  const name = 'Form'

  const {state, setState} = createState({
    name: ''
  })

  const onUpdateInput = (e) => {
    setState({name: state.name + e.target.value}, Form)
  }

  const render = () => {
    return [
      node({
        el: 'form',
        render: () => [
          createContainer([state.name || 'No data']),
          createContainer([
            node({
              el: 'label',
              render: () => [
                'Name',
                node({
                  el: 'input',
                  styles: {marginLeft: '10px'},
                  events: [
                    // [onInput, onUpdateInput],
                    [onChange, onUpdateInput]
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