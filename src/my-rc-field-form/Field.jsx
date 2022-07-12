import React, { Component } from "react";
import FieldContext from "./FieldContext";

class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    const { registerFieldEntries } = this.context;
    this.unRegitser = registerFieldEntries(this);
  }

  componentWillUnmount() {
    this.unRegitser();
  }

  getControlled() {
    const { getFieldValue, setFieldValue } = this.context;
    const { name } = this.props;

    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldValue({
          [name]: newValue,
        });
      },
    };
  }

  render() {
    const { children } = this.props;
    return React.cloneElement(children, this.getControlled());
  }
}

//const Field = ({ children, name }) => {
//  const { getFieldValue, setFieldValue } = useContext(FieldContext);
//
//  return React.cloneElement(children, {
//    value: getFieldValue(name),
//    onChange: (e) => {
//      const newValue = e.target.value;
//      setFieldValue({
//        [name]: newValue,
//      });
//    },
//  });
//};

export default Field;
