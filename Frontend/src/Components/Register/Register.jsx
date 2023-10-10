import "./register.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            role: form.role.value,
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
        <div className="register_surround">        
            <div className="register_container">
                <h1>Welcome to Free-D-T-P</h1>
                <h2>Register</h2> 
                <form ref={formRef} onSubmit={(e) => registerUser(e)}>
                   
                    <div className="register_namecontainer">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Frist Name</label>
                            <input required name="firstname" type="text" class="form-control" id="firstnameinput" placeholder="First Name"/>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Last Name</label>
                            <input type="text" required name="lastname" class="form-control" id="lastnameinput" placeholder="Last Name"/>
                        </div>

                    </div>
                    
                        <Form.Select aria-label="Default select example" name="role">
                            <option>Select Role</option>
                            <option value="Coach">Coach</option>
                            <option value="Athlet">Athlet</option>
                        </Form.Select>                   
                        
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


                    <div className="register_buttoncontainer">
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