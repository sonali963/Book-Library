import React from "react";
import {useNavigate} from "react-router-dom";
import { useState ,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
 import { useFirebase } from "../context/firebase";



 export const SigninPage=()=>{
    
const navigate=useNavigate();
    const firebase=useFirebase();
    useEffect(()=>{
        if(firebase.isloggedin){
            navigate("/");

        }
    },[firebase,navigate])
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
       await firebase.signinUser(email,password)

    }
   
    return(
        <div className="Container">
                <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
    <h3 className="mt-5 mb-5">Or</h3>
    <Button onClick={firebase.signinwithGoogle}variant="danger">Signin with Google</Button>
  
        </div>
    )
}