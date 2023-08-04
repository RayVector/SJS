let appId

export const rerender = (state, component) => {
  const newComponent = component()

  for (const stateKey in state) {
    newComponent.state[stateKey] = state[stateKey]
  }

  prepareShadowDom(newComponent)
}

// node settings
export const defineNode = (node) => {
  return {
    events: [],
    el: 'div',
    content: [],
    ...node
  }
}

const setNodeContent = (newNode, contentNode) => newNode.innerText = contentNode

const setEvent = (node, event) => node.addEventListener(event.name, event.do)

const createNode = (nodeData) => {
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

// render all children
const prepareShadowNode = (rootComponent) => {
  // children
  rootComponent.children = rootComponent.render(rootComponent.state)
  rootComponent.children.forEach(child => {
    // component
    if (child.hasOwnProperty('render')) {
      prepareShadowNode(child)
    }
  })
  return rootComponent
}

// replace dom to shadowDom
const renderShadowDom = (shadowDom) => {
  const root = document.getElementById(appId)
  const newRoot = document.createElement('div')
  const body = document.getElementsByTagName('body')[0]
  newRoot.id = appId

  shadowDom.children.forEach(child => {
    if (child.hasOwnProperty('el')) {
      newRoot.appendChild(createNode(child))
    } else {
      child.children.forEach(subChild => {
        newRoot.appendChild(createNode(subChild))
      })
    }
  })
  root.remove()
  body.appendChild(newRoot)
}

const prepareShadowDom = (rootComponent) => {
  const shadowDom = prepareShadowNode(rootComponent)
  renderShadowDom(shadowDom)
}

// main
export const createApp = (id, component) => {
  appId = id
  // shadow dom
  prepareShadowDom(component())
}
