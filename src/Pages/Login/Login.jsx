import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handlePassword = (e) => {
        e.preventDefault();
        const passwordInput = e.target.value;
        setPassword(passwordInput);
        if (passwordInput.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
        } else if (!/[A-Z]/.test(passwordInput)) {
            setPasswordError("Password must contain at least one capital letter");
        } else {
            setPasswordError("");
        }
    };
    console.log(error.message);
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setError(""); // Clear any previous errors
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Login Successful.",
                    showClass: {
                        popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                    },
                })
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(error.message); // Set the error message
            });
    };

    return (
        <>
            <Helmet>
                <title>Pro-Learn | LOGIN</title>
            </Helmet>
            <div className="hero justify-center min-h-screen items-center mx-auto w-full bg-base-200">
                <div className="hero-content items-center flex-col lg:flex-row">
                    <div className="md:mr-14 w-1/2">
                        <img src={"https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg"} alt="" />
                    </div>
                    <div className="card flex-shrink-0 justify-center items-center w-11/12 md:w-[400px] shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-center">Login now!</h1>

                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input name="email" type="text" placeholder="email" className="input input-bordered" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="input input-bordered mb-3"
                                            id="password"
                                            name="password"
                                            required
                                            value={password}
                                            onChange={handlePassword}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="******************"
                                            style={{ width: "100%" }} // Set a fixed width for the input field
                                        />
                                        <span className="toggle-password" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    {passwordError && <span className="error">{passwordError}</span>}
                                </div>

                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Login" />
                                </div>
                                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display the error message */}
                            </form>
                            <p className="md:my-4 text-center">
                                New to Toy Car Store? <Link className="text-orange-500 font-semibold" to="/signup">Sign Up</Link>
                            </p>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
