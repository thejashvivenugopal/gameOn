import React, { useState } from 'react';
import '../../styles/signUp/SignUp.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface userRegister {
    firstName: string,
    lastName: string,
    emailId: string,
    mobileNumber: string,
    password: string,
    confirmPassword: string,
    accountNumber: string,
    routingNumber: string
}

export default function SignUp() {
    const [formData, setFormData] = useState<userRegister>({
        firstName: '',
        lastName: '',
        emailId: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        accountNumber: '',
        routingNumber: ''
    });

    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handling input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clearing password mismatch error when input is changed
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordError('');
        }
    };

    // Handling form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const { firstName, lastName, emailId, mobileNumber, password, confirmPassword, accountNumber, routingNumber } = formData;

        // Validating form data
        if (!firstName || !lastName || !emailId || !mobileNumber || !password || !confirmPassword || !accountNumber || !routingNumber) {
            toast.error('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            // setPasswordError('Passwords do not match.');
            return;
        }

        const userData = {
            firstName,
            lastName,
            emailId,
            mobileNumber,
            password,
            accountNumber,
            routingNumber
        };

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3002/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' :`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Account created successfully!');
                navigate('/'); // Redirect to the login page
            } else {
                toast.error(data.message || 'Sign-up failed. Please try again.');
                setError(data.message || 'Sign-up failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            setError('An error occurred. Please try again later.');
            console.error('Error during API call:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="signUp-container">
            {/* Main container for the sign-up form */}
            <div className="signUp-header">
                <h2>Create Your Account</h2>
            </div>
            {/* Form element to handle user inputs and submission */}
            <form className="signUp-form" onSubmit={handleSubmit}>
            {/* Left Section-First Name,Last Name,emailid,mobileNumber*/}
                <div className="form-section">
                    <div className="form-group">
                       {/* Input field for first name */}
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            pattern="[A-Za-z ]{3,}"
                            title="Please provide atleast 3 characters"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        {/* Input field for last name */}
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            pattern="[A-Za-z ]{3,}"
                            title="Please provide atleast 3 characters"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        {/* Input field for email address */}
                        <label htmlFor="emailId">Email Address</label>
                        <input
                            type="email"
                            id="emailId"
                            name="emailId"
                            placeholder="Enter your email address"
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]$"
                            title="Please enter proper mail id"
                            value={formData.emailId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        {/* Input field for mobile number */}
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="Enter your mobile number"
                            pattern="\d{10}" 
                            title="Mobile number must be exactly 10 digits."
                            value={formData.mobileNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Right Section-Password,Confirm Password,Bank Account number,Routing Number*/}
                <div className="form-section">
                    <div className="form-group">
                        {/* Input field for creating a password */}
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$"
                            title="Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character (@, #, $, %, ^, &, +, =)."
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        {/* Input field for confirming the password */}
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {/* Error message for password mismatch */}
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    <div className="form-group">
                        {/* Input field for Bank Account number */}
                        <label htmlFor="accountNumber">Bank Account Number</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            placeholder="Enter your account number"
                            pattern="\d{5,17}" 
                            // Allows 5 to 17 digits, inclusive
                            title="Bank account number must be between 5 and 17 digits, inclusive."
                            value={formData.accountNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        {/* Input field for Routing number */}
                        <label htmlFor="routingNumber">Routing Number</label>
                        <input
                            type="text"
                            id="routingNumber"
                            name="routingNumber"
                            placeholder="Enter your routing number"
                            pattern="\d{9}" // Matches exactly 9 digits
                            title="Routing number must be exactly 9 digits."
                            value={formData.routingNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* Footer Section - Submit Button and Login Link */}
                <div className="form-footer">
                    <button type="submit" className="signUp-button" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <p className="login-link">
                        {/* Link for users who already have an account */}
                        Already have an account?
                        <a href="/" className="login-link-anchor">Login</a>
                    </p>
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}
