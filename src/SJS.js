import {renderComponent, prepareShadowNode} from "./engine/shadow-dom";

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
export const createApp = (component) => {
  // shadow dom
  const newRootComponent = node({
    ...component()
  })
  newRootComponent.name = component.prototype.constructor.name
  newRootComponent.onMounted()
  renderComponent(prepareShadowNode(newRootComponent))
}
