import Button from "./Button";
import {defineNode} from "../../../src";

const App = () => {
  // view
  const render = () => [
    'qwe',
    Button('test'),
    defineNode({
      render: () => [Button('test2')]
    })
  ]

  return {
    render
  }
}

export default App
