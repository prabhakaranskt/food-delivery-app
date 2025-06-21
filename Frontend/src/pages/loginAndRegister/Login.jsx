import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = ({ setIsLoggedIn }) => {
    const containerRef = useRef(null);
    const loginEmailRef = useRef(null);
    const loginPassRef = useRef(null);
    const regNameRef = useRef(null);
    const regEmailRef = useRef(null);
    const regPassRef = useRef(null);
    const loginErrorRef = useRef(null);
    const regErrorRef = useRef(null);
    const regBtnRef = useRef(null);
    const logBtnRef = useRef(null);

    const navigate = useNavigate();

    async function register(event) {
        event.preventDefault();
        const userName = regNameRef.current.value.trim();
        const email = regEmailRef.current.value.trim();
        const passWord = regPassRef.current.value;

        clearErrors(regErrorRef);

        let valid = true;

        if (userName === "") {
            showError("Username is required", regErrorRef);
            valid = false;
        }

        if (!validateEmail(email)) {
            showError("Invalid email Address", regErrorRef);
            valid = false;
        }

        if (passWord.length < 6) {
            showError("Password must be at least 8 characters", regErrorRef);
            valid = false;
        }

        if (!valid) {
            return;
        }

        const res = await fetch("http://localhost:4000/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: userName, email, password: passWord }),
        });

        const data = await res.json();
        if (data.success) {
            alert("Registered successfully!");
            localStorage.setItem("token", data.token); // optional
        } else {
            showError(data.message, regErrorRef);
        }
    }

    function validateEmail(email) {
        return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email);
    }

    function clearErrors(ref) {
        if (ref && ref.current) ref.current.innerText = "";
    }

    function showError(msg, ref) {
        if (ref && ref.current) ref.current.innerText = msg;
    }

    async function login(event) {
        event.preventDefault();
        const email = loginEmailRef.current.value.trim();
        const passWord = loginPassRef.current.value;

        clearErrors(loginErrorRef);

        if (email === "" || passWord === "") {
            showError("Please enter Email and Password.", loginErrorRef);
            return;
        }

        const res = await fetch("http://localhost:4000/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: passWord }),
        });

        const data = await res.json();
        if (data.success) {
            alert("Login Successful!");
            navigate("/home");
            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user._id)); // still optional

            setIsLoggedIn(true);
            
        } else {
            showError(data.message, loginErrorRef);
        }
    }
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="login-body">
            <div
                ref={containerRef}
                className={`container-login ${isRegister ? "active" : ""}`}
            >
                <div className="form-box login">
                    <form action="" className="form-wrapper">
                        <h1>Login</h1>
                        <div ref={loginErrorRef} id="loginErrorBox"></div>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email"
                                id="email-login"
                                ref={loginEmailRef}
                            />
                            <img
                                className="icon-img-wrapper"
                                src="https://img.icons8.com/ios/50/new-post--v1.png"
                                alt="new-post--v2"
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                id="password-login"
                                ref={loginPassRef}
                            />
                            <img
                                className="icon-img-wrapper"
                                src="https://img.icons8.com/ios/50/password--v1.png"
                                alt="password--v1"
                            />
                        </div>
                        <div className="forgot-link">
                            <a href="#">Forgot Password</a>
                            <i className="bx ics-lockd"></i>
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            ref={logBtnRef}
                            onClick={login}
                        >
                            Login
                        </button>
                        <p>Or Login with Social Platforms</p>
                        <div className="social-icons">
                            <ul className="icon-list">
                                <li>
                                    <a href="#">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="form-box register">
                    <form action="" className="form-wrapper">
                        <h1 id="reg">Registration</h1>
                        <div id="registerErrorBox" ref={regErrorRef}></div>

                        <div className="input-box">
                            <input
                                type="text"
                                id="user-name"
                                placeholder="Username"
                                ref={regNameRef}
                            />
                            <img
                                className="icon-img-wrapper"
                                src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                                alt="user-male-circle--v1"
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                id="email-id"
                                placeholder="Email"
                                ref={regEmailRef}
                            />
                            <img
                                className="icon-img-wrapper"
                                src="https://img.icons8.com/ios/50/new-post--v1.png"
                                alt="new-post--v1"
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                id="pass-word"
                                placeholder="password"
                                ref={regPassRef}
                            />
                            <img
                                className="icon-img-wrapper"
                                src="https://img.icons8.com/ios/50/password--v1.png"
                                alt="password--v1"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn"
                            ref={regBtnRef}
                            onClick={register}
                        >
                            Register
                        </button>
                        <p>Or Register with Social Platforms</p>
                        <div className="social-icons">
                            <ul className="icon-list">
                                <li>
                                    <a href="#">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an Account?</p>
                        <button
                            className="btn register-btn"
                            onClick={() => setIsRegister(true)}
                        >
                            Register
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p> Already have an Account?</p>
                        <button
                            className="btn login-btn"
                            onClick={() => setIsRegister(false)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
