import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import { useAppContext } from '../../../context/AppContext.jsx';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { Login, navigate} = useAppContext();
    const [open, setOpen] = useState(false); 
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(!email || !password){
                setOpen(true);
                setMessage("Please fill all the fields");
                setSeverity("error");
                return;
            }else{
                const res = await Login(email, password);
                setOpen(true);
                setMessage("User Logged in Successfully!")
                setSeverity('success');
                if(res.role === 'MANAGER'){
                    setTimeout(() => navigate("/manager/dashboard"), 2000);
                }else{
                    setTimeout(() => navigate("/employee/dashboard"), 2000);
                }
            }
        }catch(err){
            if(err.response?.data?.error){
                const errorMsg =  err.response?.data?.error;
                setMessage(errorMsg );
                setSeverity("error");
                setOpen(true);
            }else{
                setMessage("Something went wrong, Please try again later.");
                setSeverity("error");
                setOpen(true);
            }
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    return (
        <>
        <div className="signin-container">
            <div className="signin-card">
                <div className="signin-header">
                    <h1>Sign in</h1>
                </div>

                <form className="signin-form" onSubmit={handleSubmit} noValidate>
                    <div className="signin-form-group">
                        <label>Email ID</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="signin-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                        <a href="#" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Forgot password?</a>
                    </div>

                    <button type="submit" className="signin-auth-button">Sign In</button>
                </form>

                <div className="signin-auth-footer">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
        <Snackbar
            open={open}
            autoHideDuration={1800}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
            >
            {message}
            </MuiAlert>
        </Snackbar>
        </>
    );
};

export default SignIn;
