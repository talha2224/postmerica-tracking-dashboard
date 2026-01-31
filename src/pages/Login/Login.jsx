import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import InputField from '../../components/InputField';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form', {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: '#ef4444',
                    color: '#fff',
                    fontWeight: '500',
                },
            });
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (
                formData.email === 'admin@postmerica.com' &&
                formData.password === 'admin#Postmerica@341'
            ) {
                toast.success('Login successful! Welcome back', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#10b981',
                        color: '#fff',
                        fontWeight: '500',
                    },
                });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 500);
            } else {
                toast.error('Invalid email or password', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#ef4444',
                        color: '#fff',
                        fontWeight: '500',
                    },
                });
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#ef4444',
                    color: '#fff',
                    fontWeight: '500',
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const EmailIcon = ({ size = 20 }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );

    const LockIcon = ({ size = 20 }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );

    return (
        <div className="login-page">
            <div className="bg-decoration">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="logo-container">
                            <div className="logo">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect width="40" height="40" rx="8" fill="url(#logo-gradient)" />
                                    <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h1 className="brand-name">Postmerica</h1>
                        </div>
                        <p className="welcome-text">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <InputField
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            icon={EmailIcon}
                            required
                            className="bg-transparent border-b border-slate-300 outline-none w-[70%]"
                        />

                        <InputField
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            icon={LockIcon}
                            required
                            className="bg-transparent border-b border-slate-300 outline-none w-[70%]"
                        />

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <button type="button" className="forgot-password">
                                Forgot password?
                            </button>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign in</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>
                            Don't have an account?{' '}
                            <button type="button" onClick={() => navigate('/signup')} className="signup-link">
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>

                <div className="login-illustration">
                    <div className="illustration-content">
                        <h2>Start your journey with us</h2>
                        <p>Enjoy fixed shipping rates up to 94% off from leading carriers.</p>
                        <div className="feature-list">
                            <div className="feature-item">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Low fixed shipping rates</span>
                            </div>
                            <div className="feature-item">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Around the clock support</span>
                            </div>
                            <div className="feature-item">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Zero monthly fees</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
