import {createState, node} from "../../../src";
import {onChange, onClick} from "../../../src/enum/actions";
import {createContainer} from "../../../src/interfaces/interfaces";

const Form = () => {

  const {state, setState} = createState({
    name: '',
    phone: ''
  }, Form)

  const onUpdateInputName = (e) => {
    setState({name: e.target.value})
  }
  const onUpdateInputPhone = (e) => {
    setState({phone: e.target.value})
  }

  const onSubmit = () => {
    console.log('submit', state)
  }

  const render = () => {
    return [
      node({
        el: 'form',
        render: () => [
          createContainer([
            node({
              el: 'label',
              render: () => [
                'Name',
                node({
                  el: 'input',
                  styles: {margin: '10px'},
                  attrs: [{value: state.name}],
                  events: [
                    [onChange, onUpdateInputName]
                  ]
                })
              ]
            })
          ]),
          createContainer([
            node({
              el: 'label',
              render: () => [
                'Phone',
                node({
                  el: 'input',
                  styles: {margin: '10px'},
                  attrs: [{value: state.phone}],
                  events: [
                    [onChange, onUpdateInputPhone]
                  ]
                })
              ]
            })
          ]),
          createContainer([
            node({
              el: 'button',
              attrs: [{type: 'button'}],
              events: [
                [onClick, onSubmit]
              ],
              render: () => [
                'Submit',
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