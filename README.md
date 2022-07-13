# min-rc-field-form

帮助你快速了解 [rc-field-form](https://github.com/react-component/field-form) 的实现方式。

## 目录

- [前言](#前言)
- [实现思路](#实现思路)
- [原仓库&nbsp;Demo](#原仓库-demo)
- [本仓库&nbsp;Demo](#本仓库-demo)
    - [Function&nbsp;Component](#function-component)
    - [Class&nbsp;Component](#class-component)
- [如何交流](#如何交流)

## 前言

这个仓库的实现总的思路是一致的，但实现细节会有所不同。你可以通过学习本仓库的代码后，继续浏览 `rc-field-form` 的源码进行补充学习。

## 实现思路

简要的介绍一下设计流程，具体实现需要浏览对应的文件。代码在 `src/my-rc-field-form` 目录中。

先设计好组件的使用方式

```jsx
<Form>
  <Field>
    <Input />
  </Field>
  <Field>
    <Input />
  </Field>
  <button />
</Form>
```

简单思考一下，我们最终的效果是要通过 button 获取我们 input 中输入的值。

我们可以通过定义一个额外的 Store 来存储这些值，并暴露一些方法出去获取/设置这些值。 `my-rc-field-form/useForm`

将该 Store 传给 Form，Form 可以通过 api 获取值。设置值我们可以通过 Context 把 Store 实例传给 Field 的子组件，通过 name 获取对应的值。设置到 value 中。

当 Input 出发 change 的时候，我们通过 Store 实例的方法把 value 设置回去。但因为 Store 没有与 React 产生关联，并不会更新 UI。

所以们需要在 Field 中添加强制刷新的方法，在挂在到页面的时候，将实例保存到 Store 中。在 Input 发生改变的时候我们在 Store 的实例中，找到发生更改的组件并触发他的强制刷新。

最终获取值，只需要在触发 Form 表单的 submit 时，调用 Store 的方法返回值即可。

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
