import {prepareShadowDom} from "./engine/shadow-dom";

export let appId

// node settings
export const node = (node) => {
  return {
    events: [],
    el: 'div',
    styles: {},
    if: true,
    isShown: true,
    attrs: [],
    classes: [],
    render: () => [],
    onMounted: () => {},
    ...node
  }
}

// main
export const createApp = (id, component) => {
  appId = id
  // shadow dom
  const newRootComponent = node({
    ...component()
  })
  newRootComponent.onMounted()
  prepareShadowDom(newRootComponent)
}
