import React from "react";

const Field = ({ children }) => {
  const input = React.cloneElement(children, {
    value: "你好",
    onChange: (e) => {
      console.log(e.target.value);
    },
  });
  return input;
};

export default Field;
