import { useRef } from "react";

class FormStore {
  constructor() {
    this.store = {};
    this.callbacks = {};
  }

  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = (fieldName) => {
    return this.store[fieldName];
  };

  setCallbacks = (callbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks,
    };
    console.log(this.callbacks)
  };

  onSubmit = () => {
    const { onFinish } = this.callbacks;
    onFinish();
    console.log("onFinish");
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setCallbacks: this.setCallbacks,
      submit: this.onSubmit,
    };
  };
}

const useForm = () => {
  const ref = useRef();
  if (!ref.current) {
    const store = new FormStore();
    ref.current = store.getForm();
  }
  return [ref.current];
};

export default useForm;
