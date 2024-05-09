import axios from 'axios'

import {createState, node, rerender} from '../../../src/index'

import Button from './Button'
import {addBtnStyles} from '../styles/btn'
import TodoItem from './TodoItem'
import {onClick} from "../../../src/enum/actions";

const App = () => {
  // state
  const {state, setState} = createState({
    count: 0,
    buttonMsg: 'qwe',
    todos: [],
    isAsyncLoading: false,
    isShown: false,
    isShown2: false
  })

  // methods
  const fullHideText = () => {
    setState({isShown: !state.isShown}, App)
    // rerender(state, App)
  }

  const partialHideText = () => {
    setState({isShown2: !state.isShown2}, App)
  }

  const rise = () => {
    setState({count: state.count + 1}, App)
  }

  const updateButtonText = () => {
    setState({buttonMsg: 'qweasdzxc'}, App)
  }

  const undoButtonText = () => {
    setState({buttonMsg: 'qwe'}, App)
  }

  // computed
  const computedCountTodos = () => {
    return state.count + state.todos.length
  }

  // lifecycle hook
  const onMounted = () => {
    // getAsyncList()
  }

  const getAsyncList = async () => {
    try {
      setState({isAsyncLoading: true}, App)
      setTimeout(async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
        state.todos = res.data.slice(0, 10)
        setState({isAsyncLoading: false}, App)
      }, 2000)
    } catch (e) {
      console.error(e)
    }
  }

  // view
  const render = () => [
    node({
      el: 'h1',
      attrs: [
        {id: 'qwe'}
      ],
      render: () => ['Conditional render:']
    }),
    node({
      el: 'button',
      render: () => ['Full Toggle'],
      events: [[onClick, fullHideText]]
    }),
    node({
      el: 'button',
      render: () => ['Semi Toggle (Hide)'],
      events: [[onClick, partialHideText]]
    }),
    node({
      el: 'div',
      if: state.isShown,
      render: () => ['I shown']
    }),
    node({
      el: 'div',
      isShown: state.isShown2,
      render: () => ['I shown 2']
    }),
    node({
      el: 'h1',
      render: () => ['Counter:']
    }),
    node({
      el: 'div',
      styles: {
        color: 'green',
        fontSize: '26px'
      },
      render: () => [state.count]
    }),
    node({
      el: 'div',
      styles: {
        marginBottom: '5px',
      },
      render: () => [
        node({
          el: 'button',
          render: () => ['+'],
          styles: addBtnStyles,
          events: [[onClick, rise]]
        }),
      ]
    }),
    node({
      el: 'h1',
      render: () => ['Props:']
    }),
    node({
      el: 'div',
      render: () => [
        node({
          el: 'button',
          render: () => ['update buttons text'],
          events: [[onClick, updateButtonText]]
        }),
        node({
          el: 'button',
          render: () => ['undo buttons text'],
          events: [[onClick, undoButtonText]]
        })
      ]
    }),
    Button(state.buttonMsg,
      node({
        el: 'div',
        render: () => ['slot']
      })
    ),
    node({
      el: 'h1',
      render: () => ['Async list render + props + emits:']
    }),
    node({
      el: 'button',
      render: () => ['Get Async List'],
      events: [[onClick, getAsyncList]]
    }),
    node({
      el: 'div',
      if: state.isAsyncLoading,
      styles: {
        marginTop: '20px'
      },
      render: () => ['...Loading...']
    }),
    node({
      el: 'div',
      render: () => state.todos.map(todo => TodoItem(todo, (item) => alert(`From emit: ${item.title}`)))
    }),
    node({
      el: 'div',
      if: !state.todos.length && !state.isAsyncLoading,
      styles: {
        marginTop: '20px'
      },
      render: () => ['Empty list']
    }),
    node({
      el: 'h1',
      styles: {
        fontSize: '26px'
      },
      render: () => [`Computed (counter + async list length): ${computedCountTodos()}`]
    }),
  ]

  return {
    state,
    render,
    onMounted
  }
}

export default App
