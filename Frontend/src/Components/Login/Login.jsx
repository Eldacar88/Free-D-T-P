import "./login.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useRef } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = ({handleLogin, userRole, setUserRole}) => {
    
    const formRef = useRef();
    const navigator = useNavigate();

    const loginRequest = async(e) => {
        e.preventDefault();
        const form = formRef.current;
        const data = {
            role: form.role.value,
            email: form.email.value,
            password: form.password.value
        }

        const config = {
            url: "http://localhost:3002/login",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        try{
            const response = await axios(config);
            console.log(response);
            localStorage.setItem("token", response.data.token);
            handleLogin(true);

            if(response.data.selectedRole === "Coach"){
                setUserRole("coach");
            }
            else if (response.data.selectedRole === "Athlet"){
                setUserRole("athlet");
            }

            console.log(userRole);
            navigator("/home");
                
            if(response.status !== 200){
                throw new Error('failed to register');
            }
        }
        catch(error){
            console.log(error.response.data.message);
        }
    }

    const navigateToRegister= () => {
        navigator("/register");
      }

    const gotoPasswordReset= async() => {    
        navigator("/reset/askEmail");
    }

    return(
        <div className="surround">        
            <div className="logincontainer">
                <h1>Welcome to Free-D-T-P</h1>
                <h2>Login</h2> 
                <form ref={formRef} onSubmit={(e) => loginRequest(e)}>

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input required name="email" type="email" class="form-control" id="emailInput" placeholder="Email Adress"/>
                    </div>

                    <div class="mb-3">
                        <label for="inputPassword5" class="form-label">Password</label>
                        <input type="password" required name="password" id="passwordInput" class="form-control" placeholder="Password"/>
                    </div>

                    {
                        
                        <Form.Select aria-label="Default select example" name="role">
                            <option>Select Role</option>
                            <option value="Coach">Coach</option>
                            <option value="Athlet">Athlet</option>
                        </Form.Select>
                    }

                    <div className="buttoncontainer">
                        <Button  variant="dark" type="submit" size="lg" onClick={navigateToRegister}>
                            Register Now
                        </Button>
                        
                        <Button width="200px" variant="dark" type="submit" size="lg" onSubmit={loginRequest}>
                            Login
                        </Button>

                        <Button width="200px" variant="dark" type="submit" size="lg" onClick={gotoPasswordReset}>
                            Forgot Password
                        </Button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default Login;