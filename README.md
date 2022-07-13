# min-rc-field-form

帮助你快速了解 [rc-field-form](https://github.com/react-component/field-form) 的实现方式。

## 目录

- [前言](#前言)
- [原仓库&nbsp;Demo](#原仓库-demo)
- [本仓库&nbsp;Demo](#本仓库-demo)
    - [Function&nbsp;Component](#function-component)
    - [Class&nbsp;Component](#class-component)
- [如何交流](#如何交流)

## 前言

这个仓库的实现总的思路是一致的，但实现细节会有所不同。你可以通过学习本仓库的代码后，继续浏览 `rc-field-form` 的源码进行补充学习。

## 原仓库 Demo

```js
import Form, { Field } from 'rc-field-form';

const Input = ({ value = "", ...props }) => <input value={value} {...props} />;

const Demo = () => {
  return (
    <Form
      onFinish={(values) => {
        console.log("Finish:", values);
      }}
    >
      <Field name="username">
        <Input placeholder="Username"/>
      </Field>
      <Field name="password">
        <Input placeholder="Password"/>
      </Field>

      <button>Submit</button>
    </Form>
  );
};

export default Demo;
```

## 本仓库 Demo

原则上，你可以通过原仓库的 Demo 中的 import 路径替换为。本仓库中的 my-rc-field-form 路径进行演示。本仓库的例子中添加了 rules 的简单实现，所以有所不同。

### Function Component

```js
function App () {
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
          <input type="text" placeholder="请输入账号"/>
        </Field>
        <Field
          name="password"
          rules={[{ required: true, message: "密码必须输入" }]}
        >
          <input type="text" placeholder="请输入密码"/>
        </Field>
        <button>submit</button>
      </Form>
    </div>
  );
}
```

### Class Component

```js
class App extends Component {
  constructor (props) {
    super(props);
  }

  formRef = createRef();

  onSubmit = () => {
    console.log("提交", this.formRef.current.getFieldsValue());
  };
  onFail = (err) => {
    console.log("失败", err);
  };

  render () {
    return (
      <div className="App">
        <Form
          ref={this.formRef}
          onFinish={this.onSubmit}
          onFinishFailed={this.onFail}
        >
          <Field
            name="username"
            rules={[{ required: true, message: "用户名必填" }]}
          >
            <input type="text" placeholder="请输入账号"/>
          </Field>
          <Field
            name="password"
            rules={[{ required: true, message: "密码必须输入" }]}
          >
            <input type="text" placeholder="请输入密码"/>
          </Field>
          <button>submit</button>
        </Form>
      </div>
    );
  }
}
```

## 如何交流

可以添加个人微信 `gdgzyw`，或者发送邮箱 `layouwen@gmail.com`。
