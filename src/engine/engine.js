import { prepareShadowDom } from './shadow-dom'

export const setNodeContent = (newNode, contentNode) => newNode.innerText = contentNode

export const setEvent = (node, event) => node.addEventListener(event.name, event.do)


export const rerender = (state, component) => {
  const newComponent = component()

  for (const stateKey in state) {
    newComponent.state[stateKey] = state[stateKey]
  }

  prepareShadowDom(newComponent)
}

export const createNode = (nodeData) => {
  // create node
  const newNode = document.createElement(nodeData.el)
  // set events
  nodeData.events.forEach(event => setEvent(newNode, event))
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
