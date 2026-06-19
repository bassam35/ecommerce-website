import { useState, useContext } from "react";

// REACT HOOK FORM
import { useForm } from "react-hook-form";

// CONTEXT
import { AuthContext } from "../context/AuthContext";

// REACT ROUTER DOM
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('signup');
    const navigate = useNavigate();
    const { user, signUp, logIn, logOut } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();


    // HANDLE MODE SWITCH
    const handleModeSwitch = () => {
        setMode(mode === 'signup' ? 'login' : 'signup');
    }

    // HANDEL FORM SUBMISSION
    const onSubmit = (data) => {
        let result;
        if (mode === 'signup') {
            result = signUp(data.email, data.password);
        } else {
            result = logIn(data.email, data.password);
        }

        // Handle Error
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-conatiner">
                    {user && <div className="welcome-message">Welcome, {user.email}!</div>}
                    <button onClick={() => logOut()}>logOut</button>
                    <h1 className="page-title">{mode === 'signup' ? 'Sign Up' : 'Log In'}</h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input className="form-input" type="email" id="email" {...register("email", { required: "Email is required" })} />
                            {errors.email && <span className="form-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-input" type="password" id="password" {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' }, maxLength: { value: 12, message: 'Password must be less than 12 characters' } })} />
                            {errors.password && <span className="form-error">{errors.password.message}</span>}

                        </div>
                        <button className="btn btn-primary btn-large" type="submit">
                            {mode === 'signup' ? "Sign Up" : "Log In"}
                        </button>
                        <div className="auth-switch">
                            {mode === 'signup' ? <p>Already have an account? <span className="auth-link" onClick={handleModeSwitch}>Login</span></p> :
                                <p>Don't have an account? <span className="auth-link" onClick={handleModeSwitch}>SignUp</span></p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;