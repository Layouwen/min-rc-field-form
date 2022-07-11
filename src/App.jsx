import Form, { Field } from "./my-rc-field-form";

function App() {
  const [form] = Form.useForm();
  const onSubmit = () => {
    console.log("提交", form.getFieldsValue());
  };
  return (
    <div className="App">
      <Form form={form} onFinish={onSubmit}>
        <Field name="username">
          <input type="text" placeholder="请输入账号" />
        </Field>
        <Field name="password">
          <input type="text" placeholder="请输入密码" />
        </Field>
        <button>submit</button>
      </Form>
    </div>
  );
}

export default App;
