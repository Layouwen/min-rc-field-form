import React, { Component } from "react";
import FieldContext from "./FieldContext";

class Field extends Component {
  static contextType = FieldContext;

  render() {
    const { name, children } = this.props;
    const { getFieldValue, setFieldValue } = this.context;
    return React.cloneElement(children, {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldValue({
          [name]: newValue,
        });
      },
    });
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
