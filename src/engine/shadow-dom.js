import { createNode } from './engine'
import { appId } from '../SJS'


export const prepareShadowNode = (rootComponent) => {
  // children
  rootComponent.children = rootComponent.render()
  rootComponent.children.forEach(child => {
    // component
    if (child.hasOwnProperty('render')) {
      prepareShadowNode(child)
    }
  })
  return rootComponent
}

// replace dom to shadowDom
export const renderShadowDom = (shadowDom) => {
  const root = document.getElementById(appId)
  const newRoot = document.createElement('div')
  const body = document.getElementsByTagName('body')[0]
  newRoot.id = appId

  // todo (to recursion)
  shadowDom.children.forEach(child => {
    if (child.hasOwnProperty('el')) {
      if (child.if) newRoot.appendChild(createNode(child))
    } else {
      child.children.forEach(subChild => {
        if (subChild.if) newRoot.appendChild(createNode(subChild))
      })
    }
  })
  root.remove()
  body.appendChild(newRoot)
}

export const prepareShadowDom = (rootComponent) => {
  const shadowDom = prepareShadowNode(rootComponent)
  renderShadowDom(shadowDom)
}
