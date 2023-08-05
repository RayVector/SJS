import {appId, defineNode} from '../SJS'
import {createNode} from "./engine";

export const prepareShadowNode = (rootComponent) => {
  const content = rootComponent.render()
  content.forEach(child => {
    // component type
    if (child.hasOwnProperty('render')) {
      // component
      if (!child.hasOwnProperty('el')) {
        Object.assign(child, defineNode(child))
      }
      // node type
      prepareShadowNode(child)
    }
  })
  rootComponent.content = content
  return rootComponent
}

export const renderShadowDom = (shadowDom) => {
  const root = document.getElementById(appId)
  const newRoot = document.createElement('div')
  const body = document.getElementsByTagName('body')[0]
  newRoot.id = appId

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

  // todo
  root.remove()
  body.appendChild(newRoot)
}

export const prepareShadowDom = (rootComponent) => {
  const shadowDom = prepareShadowNode(rootComponent)
  renderShadowDom(shadowDom)
}
