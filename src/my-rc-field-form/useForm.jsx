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

  setFieldValue = (newValue) => {
    this.store = {
      ...this.store,
      ...newValue,
    };
  };

  setCallbacks = (callbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks,
    };
  };

  onSubmit = () => {
    const { onFinish } = this.callbacks;
    onFinish();
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setCallbacks: this.setCallbacks,
      submit: this.onSubmit,
      setFieldValue: this.setFieldValue,
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
