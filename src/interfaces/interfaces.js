import {node} from "../SJS";
import {onClick} from "../enum/actions";


export const createContainer = (nodes, classes = [], styles = {}) => {
  return node({
    el: 'div',
    classes,
    styles,
    render: () => [...nodes]
  })
}

export const createBtn = (content, clickEventHandler, classes = [], styles = {}) => {
  return node({
    el: 'button',
    classes,
    styles,
    render: () => [content],
    events: [[onClick, clickEventHandler]]
  })
}

export const importComponent = (component, props) => {
  const output = component(props)
  output.name = component.prototype.constructor.name
  return output
}