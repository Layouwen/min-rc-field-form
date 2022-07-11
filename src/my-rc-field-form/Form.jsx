import FieldContext from "./FieldContext";

const Form = ({ children, form, onFinish }) => {
  form.setCallbacks({ onFinish });

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
