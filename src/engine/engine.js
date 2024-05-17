import {renderComponent} from './shadow-dom'
import {errorMessage} from "../utils/messages";
import {node} from "../SJS";
import {onClick, onHover, onUnHover} from "../enum/actions";
import {getComponentDomId} from "../utils/node-id";

export const setNodeContent = (newNode, contentNode) => newNode.innerText = contentNode

export const setEvent = (node, event) => {
  const [name, func] = event
  node.addEventListener(name, (e) => {
    e.preventDefault()
    e.stopPropagation()
    func(e)
  })
}

const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

export const setStyles = (node, styles) => {
  for (const stylesKey in styles) {
    if (stylesKey[0] === '$') {
      // css hover
      if (stylesKey === '$hover') {
        const newStyles = styles[stylesKey]()
        node.addEventListener(onHover, (e) => {
          e.preventDefault()
          e.stopPropagation()
          for (const newStylesKey in newStyles) {
            node.style[newStylesKey] = newStyles[newStylesKey]
          }
          node.addEventListener(onUnHover, () => {
            for (const newStylesKey in newStyles) {
              const styleName = kebabize(newStylesKey)
              node.style.removeProperty(styleName)
              node.style[newStylesKey] = styles[newStylesKey]
            }
          })
        })
      }
    } else {
      node.style[stylesKey] = styles[stylesKey]
    }
  }
}


export const rerender = (component) => {
  renderComponent(component)
}

export const createNode = (nodeData) => {
  // create node
  const newNode = document.createElement(nodeData.el)
  if (nodeData.name !== undefined) {
    newNode.id = getComponentDomId(nodeData.name)
  }
  // set events
  nodeData.events.forEach(event => setEvent(newNode, event))
  // set styles
  // todo conflict setStyles with display and isShown display
  newNode.style.display = nodeData.isShown ? '' : 'none'
  setStyles(newNode, nodeData.styles)
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
  // watcher
  const watcherReflectMap = {}

  // update
  const setState = (objectValue, component) => {
    if (component === undefined || component === null) {
      errorMessage('setState should get a component for rerender!')
      return
    }

    const expandComponent = component()

    for (const objectValueKey in objectValue) {
      // watcher
      if (watcherReflectMap[objectValueKey] !== undefined) {
        watcherReflectMap[objectValueKey](objectValue[objectValueKey])
      }
      expandComponent.state[objectValueKey] = objectValue[objectValueKey]
    }

    rerender(expandComponent)
  }

  // save watcher
  const watchField = (field, cb) => {
    watcherReflectMap[field] = cb
  }
  const removeWatcher = (field) => {
    delete watcherReflectMap[field]
  }
  return {state, setState, watchField, removeWatcher}
}

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