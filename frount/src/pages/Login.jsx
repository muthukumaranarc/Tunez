import { useState } from "react";
import zxcvbn from "zxcvbn";   // <-- install this package
import google from '../assets/google.png';
import gitHub from '../assets/GitHub.png';
import '../styles/Login.css';
import logo from '../assets/Only_Logo_NoBackground.png';
import back from '../assets/background.png';
import man from '../assets/SingingMan.png';
import API_BASE_URL from '../api/apiConfig';

function Login() {
    const baseURL = API_BASE_URL;
    let [create, setCreate] = useState(true);

    let [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    let [error, setError] = useState("");
    let [passwordScore, setPasswordScore] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === "password") {
            const result = zxcvbn(value);
            setPasswordScore(result.score); // 0–4
        }

        setError(""); // Clear error when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prevent weak password submit
        if (create && passwordScore !== null && passwordScore < 2) {
            alert("Weak password! Please set a stronger password.");
            return;
        }

        if (formData.username && formData.username === formData.password) {
            setError("Username and password cannot be the same");
            return;
        }

        fetch(`${baseURL}/user/${create ? 'create' : 'loginUser'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formData)
        })
        .then(async (res) => {
            const responseText = await res.text();
            if (responseText === "Success") {
                window.location.reload();
            } else {
                alert(responseText);  // <-- only for basic auth
                setFormData({ username: "", password: "" });
            }
        })
        .catch((err) => {
            console.error("Network error:", err);
        });
    };

    const handleGoogleLogin = (e) => {
        e.preventDefault(); // prevent form submit
        window.location.href = `${baseURL}/oauth2/authorization/google`;
    };

    const handleGithubLogin = (e) => {
        e.preventDefault(); // prevent form submit
        window.location.href = `${baseURL}/oauth2/authorization/github`;
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
                    <h2>{create ? "Create Account" : "Login"}</h2>
                    <form onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}>
                        <input
                            type="text"
                            name="username"
                            className="name"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            autoComplete="new-password"
                            id="user"
                        />
                        <br />

                        <input
                            type="password"
                            name="password"
                            className="pass"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            autoComplete="new-password"
                            id="pass"
                            style={{
                                border: passwordScore !== null && passwordScore < 2
                                    ? "2px solid red"
                                    : "1px solid black"
                            }}
                        />
                        <br />

                        {/* Show error message */}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <p>or</p>

                        <button
                            type="button"
                            className="google"
                            style={{
                                backgroundImage: `url(${google})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            onClick={handleGoogleLogin}
                        ></button>
                        <button
                            type="button"
                            className="google"
                            style={{
                                backgroundImage: `url(${gitHub})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            onClick={handleGithubLogin}
                        ></button><br />

                        <button type="submit" className="submit">Next</button><br />
                        <p onClick={() => { setCreate(!create) }} className="switch">{create ? "Have an Account" : "Create Account"}</p>
                    </form>
                </div>
            </div>
            <img src={man} className='man' />
        </div>
    );
}

export default Login;
