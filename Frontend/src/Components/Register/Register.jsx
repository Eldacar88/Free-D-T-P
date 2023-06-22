import "./register.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { uuid4 } from "uuid4";

const Register = () => {

    const formRef = useRef();
    const [equal, setEqual] = useState(false);
    const navigator = useNavigate();

    const registerUser = async(e) => {
        e.preventDefault();
        
        const form = formRef.current;
        const formData = {
            id: uuid4(),
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            email: form.email.value,
            password: form.password.value
        }
        console.log(formData);
        const config = {
            url: "http://localhost:3002/register",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formData)
        }
        try{
            const response = await axios(config);
            console.log(response);
            navigator("/login");

            if(response.status !== 201){
                throw new Error('failed to register');
            }
        }
        catch(error){
            if(error.response.status === 429) {
            
            console.log(error.response.data);
        } else {
            
            console.log(error);
        }
        }
        window.location.reload();
    }

    const navigateToLogin = () => {
        navigator("/login");
      }

    return (
        <div className="surround">        
            <div className="registercontainer">
                <h1>Welcome to Free-D-T-P</h1>
                <h2>Register</h2> 
                <form ref={formRef}>
                   
                    <div className="namecontainer">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" />
                        </Form.Group>

                    </div>

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input required name="email" type="email" class="form-control" id="emailInput" placeholder="Email Adress"/>
                    </div>

                    <div class="mb-3">
                        <label for="inputPassword5" class="form-label">Password</label>
                        <input type="password" required name="password" id="passwordInput" class="form-control" placeholder="Password"/>
                        <div id="passwordHelpBlock" class="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </div>
                    </div>


                    <div className="buttoncontainer">
                        <Button size="lg" variant="dark" type="submit" onSubmit={registerUser}>Register Now</Button>
                        
                        <Button  variant="dark" type="submit" size="lg" onClick={navigateToLogin}>
                            Back to Login
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register;