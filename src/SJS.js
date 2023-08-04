import {prepareShadowDom} from "./engine/shadow-dom";

export let appId

// node settings
export const defineNode = (node) => {
  return {
    events: [],
    el: 'div',
    styles: {},
    content: [],
    ...node
  }
}

// main
export const createApp = async (id, component) => {
  appId = id
  // shadow dom
  const newRootComponent = component()
  await newRootComponent.onMounted()
  prepareShadowDom(newRootComponent)
}
