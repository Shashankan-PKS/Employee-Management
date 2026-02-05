import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { useAppContext } from '../../../context/AppContext.jsx';
import { Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";

const SignUp = () => {
    const { Register } = useAppContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); 
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [name, setName ] = useState("")
    const [email, setEmail ] = useState("")
    const [mobile, setMobile ] = useState("")
    const [bloodgrp, setBloodgrp ] = useState("")
    const [dept, setDept ] = useState("")
    const [design, setDesign ] = useState("")
    const [pass, setPass ] = useState("")
    const [cpass, setCPass ] = useState("")
    const [role, setRole ] = useState("")
    
    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(!name || !email || !mobile || !bloodgrp || !dept || !design || !pass || !cpass || !role){
                setOpen(true);
                setMessage("Please fill all the fields");
                setSeverity("error");
                return;
            }else if(pass !== cpass){
                setOpen(true);
                setMessage("Password and Confirm Password do not match");
                setSeverity("error");
                return;
            }else{
                const res = await Register(name, email,pass, role, dept, design,bloodgrp, mobile,);
                setOpen(true);
                setMessage("User Data sent to Manager Approval, Successfully!")
                setSeverity('success');
                setTimeout(() => navigate("/"), 2500);
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

    return (
        <>
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h1>Create Account</h1>
                </div>

                <form className="signup-form" onSubmit={handleSubmit} noValidate>
                    <div className="signup-form-row">
                        <div className="signup-form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            
                        </div>
                        <div className="signup-form-group">
                            <label>Email ID</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            
                        </div>
                    </div>

                    <div className="signup-form-row">
                        <div className="signup-form-group">
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            
                        </div>
                        {/* <div className="signup-form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className={errors.dob ? 'input-error' : ''}
                            />
                            {errors.dob && <span className="error-message">{errors.dob}</span>}
                        </div> */}
                    </div>

                    <div className="signup-form-row">
                        <div className="signup-form-group">
                            <label>Blood Group</label>
                            <select
                                name="bloodGroup"
                                value={bloodgrp}
                                onChange={(e) => setBloodgrp(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                            
                        </div>
                        <div className="signup-form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                placeholder="Enter your department"
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                            />
                            
                        </div>
                    </div>

                    <div className="signup-form-row">
                        <div className="signup-form-group">
                            <label>Designation</label>
                            <input
                                type="text"
                                name="designation"
                                placeholder="Enter your designation"
                                value={design}
                                onChange={(e) => setDesign(e.target.value)}
                            />
                            
                        </div>
                        <div className="signup-form-group">
                            <label>Role</label>
                            <select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="EMPLOYEE">Employee</option>
                                <option value="MANAGER">Manager</option>
                            </select>
                            
                        </div>
                    </div>

                    {/* <div className="signup-form-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            placeholder="Enter your address"
                            rows="2"
                            value={formData.address}
                            onChange={handleChange}
                            className={errors.address ? 'input-error' : ''}
                            style={{ resize: 'none' }}
                        ></textarea>
                        {errors.address && <span className="error-message">{errors.address}</span>}
                    </div> */}

                    <div className="signup-form-row">
                        <div className="signup-form-group">
                            <label>Create Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            
                        </div>
                        <div className="signup-form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Enter your confirm password"
                                value={cpass}
                                onChange={(e) => setCPass(e.target.value)}
                            />
                            
                        </div>
                    </div>

                    <button type="submit" className="signup-auth-button">Sign Up</button>
                        <div className="signup-auth-footer">
                    Already have an account? <Link to="/">Sign In</Link>
                </div>
                </form>

            </div>
        </div>
        <Snackbar
            open={open}
            autoHideDuration={2000}
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

export default SignUp;
