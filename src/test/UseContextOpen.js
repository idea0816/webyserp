import React from "react";
import UseContextOpenButton from "./UseContextOpenButton";
import { Provider } from "./context";
import { useState } from "react";

const UseContextOpen = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const contextValue = { open, toggle };
  return (
    <Provider value={contextValue}>
      <div>
        <UseContextOpenButton />
        {open && <div>Some Content</div>}
      </div>
    </Provider>
  );
};

export default UseContextOpen;
