import { prepareShadowDom } from './shadow-dom'
import {errorMessage} from "../utils/messages";

export const setNodeContent = (newNode, contentNode) => newNode.innerText = contentNode

export const setEvent = (node, event) => {
  const [name, func] = event
  node.addEventListener(name, (e) => {
    e.preventDefault()
    e.stopPropagation()
    func()
  })
}

export const setStyles = (node, styles) => {
  for (const stylesKey in styles) {
    node.style[stylesKey] = styles[stylesKey]
  }
}


export const rerender = (state, component) => {
  // init component
  const newComponent = component()
  // populate new state
  Object.assign(newComponent.state, state)
  // to mount
  prepareShadowDom(newComponent)
}

export const createNode = (nodeData) => {
  // create node
  const newNode = document.createElement(nodeData.el)
  // set events
  nodeData.events.forEach(event => setEvent(newNode, event))
  // set styles
  setStyles(newNode, nodeData.styles)
  newNode.style.display = nodeData.isShown ? '' : 'none'
  // set classes
  nodeData.classes.forEach((className) => {
    newNode.classList.add(className)
  })
  // set attributes
  nodeData.attrs.forEach((attr) => {
    const attrName = Object.entries(attr)[0][0]
    const attrValue = Object.entries(attr)[0][1]
    if (attrName && attrValue) newNode.setAttribute(attrName, attrValue)
  })
  // set content
  nodeData.content.forEach(contentNode => {
    if (typeof contentNode === 'object') {
      newNode.appendChild(createNode(contentNode))
    } else {
      setNodeContent(newNode, contentNode)
    }
  })
  // output
  return newNode
}

export const createState = (state) => {
  const setState = (objectValue, component) => {

    if (component === undefined || component === null) {
      errorMessage('setState should get a component for rerender!')
      return
    }

    for (const objectValueKey in objectValue) {
      state[objectValueKey] = objectValue[objectValueKey]
    }
    rerender(state, component)
  }
  return {state, setState}
}