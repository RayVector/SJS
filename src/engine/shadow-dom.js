import {node} from '../SJS'
import {createNode} from "./engine";
import {getComponentDomId} from "../utils/node-id";

export const prepareShadowNode = (rootComponent) => {
  const content = rootComponent.render()
  content.forEach(child => {
    // component type
    if (child.hasOwnProperty('render')) {
      // component
      if (!child.hasOwnProperty('el')) {
        Object.assign(child, node(child))
      }
      // node type
      prepareShadowNode(child)
    }
  })
  rootComponent.content = content
  return rootComponent
}

const generateNodeDom = (shadowDom, id) => {
  const newRoot = document.createElement(shadowDom.el || 'div')
  newRoot.id = id
  // content
  shadowDom.content.forEach(contentItem => {
    // node
    if (typeof contentItem === 'object') {
      if (contentItem.if) newRoot.appendChild(createNode(contentItem))
      // content
    } else {
      newRoot.innerHTML += contentItem
    }
  })
  return newRoot
}

const replaceNodes = (root, newRoot) => {
  root.replaceWith(newRoot)
}

export const renderShadowDom = (shadowDom, id) => {
  const newRoot = generateNodeDom(shadowDom, id)
  const root = document.getElementById(id)
  replaceNodes(root, newRoot)
}

export const renderComponent = (component) => {
  const shadowDom = prepareShadowNode(component)
  const id = getComponentDomId(shadowDom.name)
  renderShadowDom(shadowDom, id)
}
