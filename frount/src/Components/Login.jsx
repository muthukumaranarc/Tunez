import { useContext, useState } from "react";
import { GlobalContext } from './GlobalContext';
import google from '../assets/google.png';
import gitHub from '../assets/GitHub.png';
import './Login.css';

function Login() {
    let { status, setstatus } = useContext(GlobalContext);
    let [ formData, setFormData ] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Form submitted:", formData);
    // You can send this to your Spring Boot API
    };


    function handleGoBack() {
        setstatus(true); 
        console.log(status)
    }

    return(
        <div className="Login">
            <div className='LoginDesk'>
                <h2>Connect with us</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        className="name"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <br />

                    <input
                        type="password"
                        name="password"
                        className="pass"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <br />

                    <p>or</p>

                    <button className="google"><img src={google}/></button>
                    <button className="git"><img src={gitHub}/></button><br />

                    <button type="submit" className="submit">Next</button><br />
                    <a onClick={() => {handleGoBack()}} className="GoBack">Go Back</a>
                </form>
            </div>
        </div>
    )
}

export default Login;