import Field from "./Field";
import useForm from "./useForm";
import _Form from "./Form";

const Form = _Form;
Form.useForm = useForm;

export default Form;

export { Field, useForm };
