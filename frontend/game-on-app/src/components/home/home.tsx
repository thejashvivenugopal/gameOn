import React, { useState } from 'react';
import { Modal, Button } from '@mui/material'; // Using Material-UI for modals and buttons
import './home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';// Importing toast for notifications


// Defining TypeScript interfaces for user details and registration data
export interface UserDetails {
  userId: string;
  role: string;
  userHashId: string;
  token: string;
}

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

const HomePage: React.FC = () => {
  // State hooks for managing component state
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState('');

    // State for managing expanded card view
  const [expandedCard, setExpandedCard] = useState<string | null>(null); // State for the expanded card

  // State for handling form data during signup
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
  const handleLoginClose = () => { setShowLogin(false) };
  const handleSignupClose = () => setShowSignup(false);

  const navigate = useNavigate();

  const navigateToForgotPassword = () => {
    navigate('/forgot-password');
  };

  // const navigateToPlay = () => {
  //   navigate('/play');
  // };

  // const navigateToBook = () => {
  //   navigate('/book');
  // };


  // Handle login form submission
  const handleSubmit = async (event: React.FormEvent) => {


    event.preventDefault();

    // Validation for empty fields
    if (!email || !password) {
      setError('Please fill in both fields.');
      toast.error('Please fill in both fields.');
      return;
    }

    const userData = { email, password };
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3002/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization' :`Bearer ${localStorage.getItem('token')}`

        },
        body: JSON.stringify(userData),
      });

      const data: any = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        const successResponse: UserDetails = data;
        

        // Storing user data in localStorage
        localStorage.setItem("userId", successResponse?.userId);
        localStorage.setItem("userRole", successResponse?.role);
        localStorage.setItem("userHashId", successResponse?.userHashId);
        localStorage.setItem("token",successResponse?.token);

        setEmail('');
        setPassword('');
        setError('');
        if (successResponse.role === 'OWNER') {
          navigate('/dashboard')
        }
        else {
          navigate('/customer/dashboard')
        }
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      setError('An error occurred. Please try again later.');
      console.error('Error during API call:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (event: React.FormEvent) => {
    console.log("Test");

    event.preventDefault();

    setFormData({
      firstName: '',
      lastName: '',
      emailId: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      accountNumber: '',
      routingNumber: '',
    });

    setPasswordError('');

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

      // If signup is successful
      if (response.ok) {
        toast.success('Account created successfully!');


        // Reset form data
        setFormData({
          firstName: '',
          lastName: '',
          emailId: '',
          mobileNumber: '',
          password: '',
          confirmPassword: '',
          accountNumber: '',
          routingNumber: '',
        });

        setPasswordError('');
        handleSignupClose();
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

  const handleCardClick = (cardName: string) => {
    setExpandedCard(expandedCard === cardName ? null : cardName); // Toggle the expanded card
  };

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
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src="..\src\assets\images\logo.jpeg" alt="GameOn Logo" />
        </div>
        {/* <div className="header-icons">
          <Button className="icon" onClick={navigateToPlay}>
            <span className="emoji">🤾‍♂️</span> Play
          </Button>
          <Button className="icon" onClick={navigateToBook}>
            <span className="emoji">📅</span> Book
          </Button>
        </div> */}
        <div className="auth-buttons">
          <Button onClick={() => setShowLogin(true)}>LOGIN/SIGNUP</Button>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="main-content">
        <section className="beautiful-section">
          <h1>Welcome to GameOn</h1>
          <p>Organize and participate in exciting game tournaments!</p>
          <div className="features">
            <div
              className={`feature-card ${expandedCard === 'upcoming-tournaments' ? 'expanded' : ''}`}
              onClick={() => handleCardClick('upcoming-tournaments')}
            >
              🏆 Upcoming Tournaments
              {expandedCard === 'upcoming-tournaments' && (
                <div className="feature-body">
                  <p>This section will show all the upcoming tournaments!</p>
                  <a
                    href="https://en.wikipedia.org/wiki/Cricket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cricket-link"
                  >
                    Check out upcoming cricket tournaments on Cricbuzz
                  </a>
                </div>
              )}
            </div>

            <div
              className={`feature-card ${expandedCard === 'top-games' ? 'expanded' : ''}`}
              onClick={() => handleCardClick('top-games')}
            >
              🎮 Top Games
              {expandedCard === 'top-games' && (
                <div className="feature-body">
                  <p>Explore the most popular games right now!</p>
                  <a
                    href="https://en.wikipedia.org/wiki/Cricket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cricket-link"
                  >
                    Check out upcoming cricket tournaments on Cricbuzz
                  </a>
                </div>
              )}
            </div>
            <div
              className={`feature-card ${expandedCard === 'team-collaborations' ? 'expanded' : ''}`}
              onClick={() => handleCardClick('team-collaborations')}
            >
              🤝 Team Collaborations
              {expandedCard === 'team-collaborations' && (
                <div className="feature-body">
                  <p>Connect with teammates for upcoming tournaments!</p>
                  <a
                    href="https://en.wikipedia.org/wiki/Cricket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cricket-link"
                  >
                    Check out upcoming cricket tournaments on Cricbuzz
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* adding images */}
        </section>
        <section className="image-grid-section">
          <div className="image-grid">
            <img src="..\src\assets\images\b1.jpg" alt="Game 1" />
            <img src="..\src\assets\images\b2.jpg" alt="Game 2" />

            <img src="..\src\assets\images\b3.jpg" alt="Game 3" />
            <img src="..\src\assets\images\b4.jpeg" alt="Game 4" />
            <img src="..\src\assets\images\b5.jpg" alt="Game 5" />
          </div>
        </section>
      </div>

      {/* Login Modal */}
      <Modal open={showLogin} onClose={handleLoginClose}>
        <div className="modal-content">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">
              Login
            </Button>
          </form>
          <p className="signup-link">
            Don't have an account?{' '}
            <a
              className="link-button"
              onClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            >
              SignUp
            </a>
          </p>
          <p className="forgot-password-link">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>
      </Modal>

      {/* Signup Modal */}
      <Modal open={showSignup} onClose={handleSignupClose}>
        <div className="modal-content">
          <h2>Sign Up</h2>
          {/* adding and validating fields in the signup form */}
          <form onSubmit={handleSignupSubmit} className="signup-form">
           
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                pattern="[A-Za-z ]{3,}"
                title="Please provide at least 3 characters"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                pattern="[A-Za-z ]{3,}"
                title="Please provide at least 3 characters"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailId">Email Address</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                placeholder="Enter your email address"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]$"
                title="Please enter a proper email ID"
                value={formData.emailId}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$"
                title="Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Bank Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                placeholder="Enter your account number"
                pattern="\d{5,17}"
                title="Bank account number must be between 5 and 17 digits."
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="routingNumber">Routing Number</label>
              <input
                type="text"
                id="routingNumber"
                name="routingNumber"
                placeholder="Enter your routing number"
                pattern="\d{9}"
                title="Routing number must be exactly 9 digits."
                value={formData.routingNumber}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="submit-button">
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
