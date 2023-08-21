import React, {useState}  from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Register = ()=> {
    const [inputs, setInputs] = useState({
        userName:"", 
        email:"",
        password:"",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    console.log(inputs);
    const handleChange = (event)=> {
        setInputs(prevInputs=> {
            return {...prevInputs, [event.target.name] : event.target.value};
        });
    };

    const handleSubmit = async (event)=> {
        event.preventDefault();
        try {
            let res = await axios.post("/auth/register", inputs);
            console.log(res);
            if (res.data.code !== 200) {
                setError(res.data.message);
            } else {
                navigate("/login");
            }
        } catch (err) {
            setError(err);
        }
    };
    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type='text' placeholder="username" name="userName" onChange={handleChange}></input>
                <input required type='email' placeholder="email" name="email" onChange={handleChange}></input>
                <input required type='password' placeholder="password" name="password" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Register</button>
                {error && <p>{error}</p>}
                <span>Do you have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>);
};

export default Register;