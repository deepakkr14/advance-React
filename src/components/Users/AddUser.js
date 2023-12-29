import React, { useRef, useState, useReducer ,useEffect} from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
const reducerfun=()=>{
  return (state, action) => {
  }
}
const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeInputRef = useRef();
  const [error, setError] = useState();

  useEffect(()=>{
    const timer=setTimeout(()=>{
    if(nameInputRef.current.value.length<10){ 
      setError({
           title: 'Invalid input',
           message: ' College name  length must be of more than 10 letters'
         })
      console.log("clean up")
    }},5000)
  return ()=>{ clearTimeout(timer)}
  },[collegeInputRef.current.value.length])
  const AddUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    const enteredCollege = collegeInputRef.current.value;
  
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 || enteredCollege.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name,age (non-empty values)  and college.",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge, enteredCollege);
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
          <label htmlFor="college">College</label>
          <input id="college" type="text" ref={collegeInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
