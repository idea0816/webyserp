import React, { useContext } from "react";
import context from "../routes/context";

const Admin = () => {
  const { user } = useContext(context);
  return (
    <div>
      User is : {user.name}
      <br />
      Role is : {user.role}
      <br />
      LoggedIn : {`${user.loggedIn}`}
    </div>
  );
};

export default Admin;
