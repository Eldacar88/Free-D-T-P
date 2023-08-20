import "./resetpage.css"
import { useRef,useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';

const Resetpage = ({text,resetNumber,setResetNumber,setResetAllowed,resetAllowed}) => {
    const [fieldType,setFieldType] = useState(true);
    const [equal,setEqual] = useState(false);
    const [emailToken,setEmailToken] = useState("");
    const formRef = useRef();
    const navigator = useNavigate();
    useEffect(() => {
        setEmailToken(localStorage.getItem("resetEmail"));
    },[])

    const onFormHandle = async(e) => {
        e.preventDefault();
        //console.log(formRef.current.email.value);
        const email = formRef.current.email.value;
        const config = {
            url: "http://localhost:3002/auth/reset",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: email
            },
        }
        try {
            const response = await axios(config);
            console.log(response);
            setResetNumber(response.data.code);
            localStorage.setItem("resetEmail",response.data.token);
            //showNotification("Email sent with code to reset password","normal");
            navigator("/reset/verify");
            console.log(response);
            
        }  catch (error) {
            //showNotification(error.response.data.message,"red");
            console.log(error);
        }
    }
    
    const onVerifyHandle = async(e) => {
        e.preventDefault();
        const code = formRef.current.code.value;
        if(code == resetNumber) {
            //showNotification("Code verified","normal");
            setResetAllowed(true);
            navigator("/reset/newPassword");
        } else {
            //showNotification("Code not verified","red");
        }
    }
    
    const checkPassword = (setEqual) => {
        formRef.current.password.value === formRef.current.passwordVerify.value ? setEqual(true) : setEqual(false);
    }
    
    const onNewPasswordHandle = async(e) => {
        
        e.preventDefault();
        console.log(emailToken);
        if(equal) {
            const newPassword = formRef.current.password.value;
    
            const config = {
                url: "http://localhost:3002/auth/reset/newPassword",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${emailToken}`,
                },
                data: {
                    password: newPassword,
                },
            }
            try {
                const response = await axios(config);
                //showNotification(response.data.message,"normal");
                console.log(response);
                
                //setTimeout(() => {
                //setEmailToken("");
                //localStorage.removeItem("resetEmail");
                navigator("/login");
                //}, 1500)

            }   catch (error) {
                //showNotification(error.response.data.message,"red");
                //localStorage.removeItem("resetEmail");
                navigator("/login");
                console.log(error);
            }
        } else {
            //showNotification("Passwords are not equal","red");
        }
    }
    {if(text === "Type in your Email to reset passwort") {
        return(
            <div className="passwordsurround">
                <form
                className="formcontainer"
                ref={formRef}
                onSubmit={(e) => onFormHandle(e)}
                component="form"
                autoComplete="off"
                >
                    <h4 className="resettext">{text}</h4> 

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input 
                        name="email" 
                        required
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Email"/>
                    </div>

                    <Button width="200px" variant="dark" type="submit" size="lg" onSubmit={onFormHandle}>
                        Submit
                    </Button>
                    
                </form>
        </div>
        );
        } else if(text==="Type in the code you received via Email") {
            return(
            <div className="passwordsurround">
                <form className="formcontainer"
                ref={formRef}
                onSubmit={(e) => onVerifyHandle(e)}
                component="form"
                autoComplete="off"
                >
                    <h4 className="resettext">{text}</h4> 

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Code</label>
                        <input defaultValue="code"
                        name="code" 
                        required
                        type="number"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Number"/>
                    </div>

                    <Button width="200px" variant="dark" type="submit" size="lg" onSubmit={onVerifyHandle}>
                        Submit
                    </Button>

                </form>
            </div>
            );
        } else if(text==="Type in your new Password") {
            return(
                <div className="passwordsurround">
                    <form className="formcontainer"
                    ref={formRef}
                    onSubmit={(e) => onNewPasswordHandle(e)}
                    component="form"
                    autoComplete="off"
                    >
                        <h4 className="resettext">{text}</h4> 

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">New Password</label>
                            <input 
                            name="password" 
                            required
                            type={fieldType ? "password" : "text"}
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="New Pasword"/>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">{equal ? "💚 Equal" : "❗Password not equal"}</label>
                            <input 
                            onChange={() => checkPassword(setEqual)}
                            name="passwordVerify" 
                            required
                            type={fieldType ? "password" : "text"}
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="New Pasword"/>
                        </div>
                                                        
                        <Button width="200px" variant="dark" type="submit" size="lg" onSubmit={onNewPasswordHandle}>
                            Submit
                        </Button>
        
                    </form>
                </div>
            );
        }
    }
}

export default Resetpage;