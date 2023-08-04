import { prepareShadowDom } from './shadow-dom'

export const setNodeContent = (newNode, contentNode) => newNode.innerText = contentNode

export const setEvent = (node, event) => node.addEventListener(event.name, event.do)

export const setStyles = (node, styles) => {
  for (const stylesKey in styles) {
    node.style[stylesKey] = styles[stylesKey]
  }
}


export const rerender = (state, component) => {
  const newComponent = component()

  Object.assign(newComponent.state, state)

  prepareShadowDom(newComponent)
}

export const createNode = (nodeData) => {
  // create node
  const newNode = document.createElement(nodeData.el)
  // set events
  nodeData.events.forEach(event => setEvent(newNode, event))
  // set styles
  setStyles(newNode, nodeData.styles)
  newNode.style.display = nodeData.isShown ? 'inherit' : 'none'
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
