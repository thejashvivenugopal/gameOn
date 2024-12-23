// import React, { useState } from 'react';
// import '../../styles/login/LoginPage.css';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import i18n from '../../i18';
// import LangButtons from '../languageButtons/LangButtons';

// export interface UserDetails {
//     // _id: string,
//     // firstName: string,
//     // lastName: string,
//     // emailId: string,
//     // mobileNumber: string
//     userId: string
//     role: string
//     userHashId: string
// }

// export default function LoginPage() {
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [error, setError] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const [language, setLanguage] = useState('en');

//     const navigate = useNavigate();

//     const navigateToSignUp = () => {
//         navigate('/signup');
//     };

//     const navigateToForgotPassword = () => {
//         navigate('/forgot-password');
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (!email || !password) {
//             setError('Please fill in both fields.');
//             toast.error('Please fill in both fields.');
//             return;
//         }

//         const userData = { email, password };
//         setLoading(true);

//         try {
//             const response = await fetch('http://localhost:3002/users/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(userData),
//             });

//             const data: any = await response.json();

//             if (response.ok) {
//                 toast.success('Login successful!');
//                 const successResponse: UserDetails = data;
//                 localStorage.setItem("userId", successResponse?.userId);
//                 localStorage.setItem("userRole", successResponse?.role);
//                 localStorage.setItem("userHashId", successResponse?.userHashId);
//                 if (successResponse.role === 'OWNER') {
//                     console.log("owt");

//                     navigate('/dashboard')

//                 }
//                 else {
//                     console.log("cut");

//                     navigate('/customer/dashboard')


//                 }

//             } else {
//                 toast.error(data.message || 'Login failed. Please try again.');
//                 setError(data.message || 'Login failed. Please try again.');
//             }
//         } catch (error) {
//             toast.error('An error occurred. Please try again later.');
//             setError('An error occurred. Please try again later.');
//             console.error('Error during API call:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const { t } = useTranslation('login')
//     localStorage.setItem("language", language);
//     const handleLanguageChange = (newLanguage: string) => {
//         setLanguage(newLanguage);
//         i18n.changeLanguage(newLanguage); // Change the language in i18next
//         localStorage.setItem('language', newLanguage); // Save language preference in localStorage
//     };

//     const { t } = useTranslation('login')
//     localStorage.setItem("language", language);
//     const handleLanguageChange = (newLanguage: string) => {
//         setLanguage(newLanguage);
//         i18n.changeLanguage(newLanguage); // Change the language in i18next
//         localStorage.setItem('language', newLanguage); // Save language preference in localStorage
//     };

//     return (
//         <>
//             <LangButtons />
//             <div className='loginPage'>
//                 <div className='left'>
//                     <div>{t('label.gameOn')}</div>
//                     <img src="..\src\assets\images\sport-35488.png" alt="aaa" />
//                 </div>
//                 <div className='right'>

//                     <form onSubmit={handleSubmit}>
//                         <div className='loginCredentials'>
//                             <label htmlFor="Email">{t('login.email')}</label>
//                             <input type="text"
//                                 id="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required />
//                         </div>
//                         <div className='loginCredentials'>
//                             <label htmlFor="Password">{t('login.password')}</label>
//                             <input type="password"
//                                 id="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required />
//                         </div>
//                         <input type="submit" value={t('label.login')} />
//                         <p>{t('login.accountNotExists')} <a onClick={navigateToSingnUp}>{t('login.signUp')}</a></p>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// import React from 'react'

// export default function LoginPage() {

//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [error, setError] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const [language, setLanguage] = useState('en');

//     const navigate = useNavigate();  // Initialize the navigate function

//     const navigateToSingnUp = () => {
//         navigate('/signup')
//     }


//     // Handle form submission
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault(); // Prevent default form submission

//         // Validate form data
//         if (!email || !password) {
//             setError('Please fill in both fields.');
//             toast.error('Please fill in both fields.'); // Show toast for missing fields
//             return;
//         }

//         const userData = {
//             email,
//             password,
//         };

//         setLoading(true); // Start loading

//         try {
//             // Send POST request to the API
//             const response = await fetch('http://localhost:3002/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             });

//             const data: any = await response.json();

//             if (response.ok) {
//                 // Handle successful login
//                 toast.success('Login successful!');
//                 const successResponse: UserDetails = data;
//                 localStorage.setItem("userId", successResponse?.userId);
//                 localStorage.setItem("userRole", successResponse?.role);
//                 localStorage.setItem("userHashId", successResponse?.userHashId);
//                 localStorage.setItem("token", successResponse?.token);
//                 if (successResponse.role === 'OWNER') {
//                     console.log("owt");

//                     navigate('/dashboard')

//                 }
//                 else {
//                     console.log("cut");

//                     navigate('/customer/dashboard')


//                 }

//             } else {
//                 // Handle login failure
//                 toast.error(data.message || 'Login failed. Please try again.');
//                 setError(data.message || 'Login failed. Please try again.');
//             }
//         } catch (error) {
//             toast.error('An error occurred. Please try again later.');
//             setError('An error occurred. Please try again later.');
//             console.error('Error during API call:', error);
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };

//     const { t } = useTranslation('login')
//     localStorage.setItem("language", language);
//     const handleLanguageChange = (newLanguage: string) => {
//         setLanguage(newLanguage);
//         i18n.changeLanguage(newLanguage); // Change the language in i18next
//         localStorage.setItem('language', newLanguage); // Save language preference in localStorage
//     };

//     return (
//         <div>LoginPage</div>
//     )
// }

