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
    render: () => [],
    onMounted: () => {},
    ...node
  }
}

// main
export const createApp = (id, component) => {
  appId = id
  // shadow dom
  const newRootComponent = defineNode({
    ...component()
  })
  newRootComponent.onMounted()
  prepareShadowDom(newRootComponent)
}
