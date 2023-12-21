export function addEventListener(eventName, handler, el, hostComponent = null) {
  function boundHandler() {
    hostComponent
      ? handler.apply(hostComponent, arguments)
      : handler(...arguments);
  }

  el.addEventListener(eventName, boundHandler);
  return boundHandler;
}

export function addEventListeners(listeners = [], el, hostComponent = null) {
  const addedListeners = [];

  listeners.forEach((event) => {
    const { eventName, value: handler } = event;
    const addedListener = addEventListener(
      eventName,
      handler,
      el,
      hostComponent
    );
    addedListeners[eventName] = addedListener;
  });

  return addedListeners;
}

export function removeEventListeners(listeners = [], el) {
  Object.entries(listeners).forEach(([eventName, handler]) => {
    el.removeEventListener(eventName, handler);
  });
}
