import { useState } from "react";
import google from '../assets/google.png';
import gitHub from '../assets/GitHub.png';
import './Login.css';
import logo from '../assets/Only_Logo_NoBackground.png';
import back from '../assets/background.png';
import man from '../assets/SingingMan.png';

function Login({ setLogbut }) {
    const baseURL = import.meta.env.VITE_API_URL;

    let [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    let [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(""); // Clear error when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation: Username cannot be the same as password
        if (formData.username && formData.username === formData.password) {
            setError("Username and password cannot be the same");
            return; // Stop form submission
        }

        fetch(`${baseURL}/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formData)
        })
        .then(data => console.log(data))
        .then(() => {
            setLogbut(false);
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:7000/oauth2/authorization/google";
    };

    const handleGithubLogin = () => {
        window.location.href = "http://localhost:7000/oauth2/authorization/github";
    };

    return (
        <div className='start'>
            <img src={back} className='back' />
            <div className='wel'>
                <div className='logoDev'><img src={logo} className='logo' /></div>
                <h2>Welcome to Tunez</h2>
                <p>your music companion</p>
            </div>
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

                        {/* Show error message */}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <p>or</p>

                        <button className="google" style={{
                            backgroundImage: `url(${google})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} onClick={handleGoogleLogin}></button>
                        <button className="google" style={{
                            backgroundImage: `url(${gitHub})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} onClick={handleGithubLogin}></button><br />

                        <button type="submit" className="submit">Next</button><br />
                        <a onClick={() => { setLogbut(false) }} className="GoBack">Go Back</a>
                    </form>
                </div>
            </div>
            <img src={man} className='man' />
        </div>
    );
}

export default Login;
