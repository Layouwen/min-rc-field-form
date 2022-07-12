import Form, { Field } from "./my-rc-field-form";

function App() {
  const [form] = Form.useForm();
  const onSubmit = () => {
    console.log("提交", form.getFieldsValue());
  };
  const onFail = (err) => {
    console.log("失败", err);
  };
  return (
    <div className="App">
      <Form form={form} onFinish={onSubmit} onFinishFailed={onFail}>
        <Field
          name="username"
          rules={[{ required: true, message: "用户名必填" }]}
        >
          <input type="text" placeholder="请输入账号" />
        </Field>
        <Field
          name="password"
          rules={[{ required: true, message: "密码必须输入" }]}
        >
          <input type="text" placeholder="请输入密码" />
        </Field>
        <button>submit</button>
      </Form>
    </div>
  );
}

export default App;
