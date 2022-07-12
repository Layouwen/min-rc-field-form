import { useRef } from "react";

class FormStore {
  constructor() {
    this.store = {};
    this.callbacks = {};
    this.fieldEntries = [];
  }

  registerFieldEntries = (entity) => {
    this.fieldEntries.push(entity);
    return () => {
      this.fieldEntries = this.fieldEntries.filter((i) => i !== entity);
      delete this.store[entity.props.name];
    };
  };

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
    this.fieldEntries.forEach((entity) => {
      Object.keys(newValue).forEach((key) => {
        if (key === entity.props.name) {
          entity.forceUpdate();
        }
      });
    });
  };

  setCallbacks = (callbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks,
    };
  };

  validateRules() {
    const err = [];
    this.fieldEntries.forEach((e) => {
      const { name, rules } = e.props;
      const value = this.getFieldValue(name);

      rules.forEach((r) => {
        if (r && r.required && !value) {
          err.push({ [name]: r.message, value });
        }
      });
    });
    return err;
  }

  onSubmit = () => {
    const { onFinish, onFinishFailed } = this.callbacks;
    const err = this.validateRules();
    if (err.length > 0) {
      onFinishFailed({
        values: this.getFieldsValue(),
        errors: err,
      });
    } else {
      onFinish();
    }
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setCallbacks: this.setCallbacks,
      submit: this.onSubmit,
      setFieldValue: this.setFieldValue,
      registerFieldEntries: this.registerFieldEntries,
    };
  };
}

const useForm = (form) => {
  const ref = useRef();
  if (!ref.current) {
    if (form) {
      ref.current = form;
    } else {
      const store = new FormStore();
      ref.current = store.getForm();
    }
  }
  return [ref.current];
};

export default useForm;
