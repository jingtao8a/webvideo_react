import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../context/authcontext.js"

const Login = ()=> {
    const [inputs, setInputs] = useState({
        userName:"", 
        password:"",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    console.log(inputs)
    const handleChange = (event)=> {
        setInputs(prevInputs=> {
            return {...prevInputs, [event.target.name] : event.target.value};
        });
    };

    const handleSubmit = async (event)=> {
        event.preventDefault();
        try {
            let res = await login(inputs);
            console.log(res);
            if (res.data.code !== 200) {
                setError(res.data.message);
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err);
        }
    };
    return (
    <div className="auth">
        <h1>Login</h1>
        <form>
            <input type='text' placeholder="username" name="userName" onChange={handleChange}></input>
            <input type='password' placeholder="password" name="password" onChange={handleChange}></input>
            <button onClick={handleSubmit}>Login</button>
            {error && <p>{error}</p>}
            <span>Don't you have an account? <Link to="/register">Register</Link></span>
        </form>
    </div>);
};

export default Login;