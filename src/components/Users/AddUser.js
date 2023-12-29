import React, { useRef, useState, useReducer} from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
const reducerfun=()=>{
  return (state, action) => {
  }
}
const AddUser = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const collegeInputRef = useRef();
  const [error, setError] = useState();

  const AddUserHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
   
  
    if (!enteredEmail.includes('@') ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid Email address.",
      });
      return;
    }
    if (+enteredPassword.length < 8) {
      setError({
        title: "Invalid password",
        message: "Pasword must be 8 characters long.",
      });
      return;
    }
    props.onAddUser(enteredEmail, enteredPassword);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={AddUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          {/* <label htmlFor="college">College</label>
          <input id="college" type="text" ref={collegeInputRef} /> */}
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
