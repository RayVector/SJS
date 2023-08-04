import {prepareShadowDom} from "./engine/shadow-dom";

export let appId

// node settings
export const defineNode = (node) => {
  return {
    events: [],
    el: 'div',
    styles: {},
    if: true,
    isShown: true,
    content: [],
    ...node
  }
}

// main
export const createApp = async (id, component) => {
  appId = id
  // shadow dom
  const newRootComponent = component()
  // todo (to nested)
  await newRootComponent.onMounted()
  prepareShadowDom(newRootComponent)
}
