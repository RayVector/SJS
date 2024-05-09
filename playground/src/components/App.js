import axios from 'axios'

import {createState, defineNode, rerender} from '../../../src/index'

import Button from './Button'
import {addBtnStyles} from '../styles/btn'
import TodoItem from './TodoItem'

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
    setState({ isShown: !state.isShown }, App)
    // rerender(state, App)
  }

  const partialHideText = () => {
    setState({ isShown2: !state.isShown2 }, App)
  }

  const rise = () => {
    setState({ count: state.count + 1 }, App)
  }

  const updateButtonText = () => {
    setState({ buttonMsg: 'qweasdzxc' }, App)
  }

  const undoButtonText = () => {
    setState({ buttonMsg: 'qwe' }, App)
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
      setState({ isAsyncLoading: true }, App)
      setTimeout(async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
        state.todos = res.data.slice(0, 10)
        setState({ isAsyncLoading: false }, App)
      }, 2000)
    } catch (e) {
      console.error(e)
    }
  }

  // view
  const render = () => [
    defineNode({
      el: 'h1',
      render: () => ['Conditional render:']
    }),
    defineNode({
      el: 'button',
      render: () => ['Full Toggle'],
      events: [{name: 'click', do: fullHideText}]
    }),
    defineNode({
      el: 'button',
      render: () => ['Semi Toggle (Hide)'],
      events: [{name: 'click', do: partialHideText}]
    }),
    defineNode({
      el: 'div',
      if: state.isShown,
      render: () => ['I shown']
    }),
    defineNode({
      el: 'div',
      isShown: state.isShown2,
      render: () => ['I shown 2']
    }),
    defineNode({
      el: 'h1',
      render: () => ['Counter:']
    }),
    defineNode({
      el: 'div',
      styles: {
        color: 'green',
        fontSize: '26px'
      },
      render: () => [state.count]
    }),
    defineNode({
      el: 'div',
      styles: {
        marginBottom: '5px',
      },
      render: () => [
        defineNode({
          el: 'button',
          render: () => ['+'],
          styles: addBtnStyles,
          events: [{name: 'click', do: rise}]
        }),
      ]
    }),
    defineNode({
      el: 'h1',
      render: () => ['Props:']
    }),
    defineNode({
      el: 'div',
      render: () => [
        defineNode({
          el: 'button',
          render: () => ['update buttons text'],
          events: [{name: 'click', do: updateButtonText}]
        }),
        defineNode({
          el: 'button',
          render: () => ['undo buttons text'],
          events: [{name: 'click', do: undoButtonText}]
        })
      ]
    }),
    Button(state.buttonMsg,
      defineNode({
        el: 'div',
        render: () => ['slot']
      })
    ),
    defineNode({
      el: 'h1',
      render: () => ['Async list render + props + emits:']
    }),
    defineNode({
      el: 'button',
      render: () => ['Get Async List'],
      events: [{name: 'click', do: getAsyncList}]
    }),
    defineNode({
      el: 'div',
      if: state.isAsyncLoading,
      styles: {
        marginTop: '20px'
      },
      render: () => ['...Loading...']
    }),
    defineNode({
      el: 'div',
      render: () => state.todos.map(todo => TodoItem(todo, (item) => alert(`From emit: ${item.title}`)))
    }),
    defineNode({
      el: 'div',
      if: !state.todos.length && !state.isAsyncLoading,
      styles: {
        marginTop: '20px'
      },
      render: () => ['Empty list']
    }),
    defineNode({
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
