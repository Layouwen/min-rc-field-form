import FieldContext from "./FieldContext";

const Form = ({ children, form, onFinish, onFinishFailed }) => {
  form.setCallbacks({ onFinish, onFinishFailed });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.submit();
      }}
    >
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  );
};

export default Form;
