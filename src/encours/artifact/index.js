export const createArtifact = (initialValue) => {
  let _value = initialValue;
  let subscribers = [];

  const notify = () => {
    for (let subscriber of subscribers) {
      subscriber(_value);
    }
  };

  return {
    get value() {
      return _value;
    },
    set value(v) {
      _value = v;
      notify();
    },
    subscribe: (subscriber) => {
      subscribers.push(subscriber);
    },
  };
};
