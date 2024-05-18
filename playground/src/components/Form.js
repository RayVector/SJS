import {createState, node} from "../../../src";
import {onInput, onChange} from "../../../src/enum/actions";
import {createContainer} from "../../../src/interfaces/interfaces";

const Form = () => {

  const {state, setState} = createState({
    name: ''
  }, Form)

  const onUpdateInput = (e) => {
    setState({name: state.name + e.target.value})
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
  return {state, render}
}

export default Form