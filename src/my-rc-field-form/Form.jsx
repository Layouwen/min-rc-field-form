import { useEffect } from "react";
const Form = ({ children, form, onFinish }) => {
  useEffect(() => {
    form.setCallbacks({ onFinish });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e, 'onSubmit')
        form.submit();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
