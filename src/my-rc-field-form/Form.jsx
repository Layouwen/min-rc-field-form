import { useImperativeHandle } from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

const Form = ({ children, form, onFinish, onFinishFailed }, ref) => {
  const [formInstance] = useForm(form);
  formInstance.setCallbacks({ onFinish, onFinishFailed });

  useImperativeHandle(ref, () => formInstance);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
};

export default Form;
