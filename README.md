# SJS - SoloJavaScript

#### - a UI reactive framework


Todo:

- List rendering (done)
- Emits from components (done)
- Conditional rendering (done)
- Lifecycle hook mounted (done)
- Lifecycle hooks
- Router
- Store
- Forms
- Dynamic component
- Watchers (done)
- Computed (done)
- Slots (done)
- Html attributes to node (done)
- UI kit configuration
- More events


Problems:

- Major: Multiple components with state are not allowed, because I use component id-name for rerender
- Major: Instant rerender (for example onInput in input) are not allowed, because I use replaceWith to replace new node
- Major: Component with state will rerender with default state on rerender parent component