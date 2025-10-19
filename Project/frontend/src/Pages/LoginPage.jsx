import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormGroup, Button, Alert, Card } from '../Components/Common';
import { Container } from '../Components/Layout';
import authService from '../Services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // UI state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    // Do NOT clear alert on input change
  };

  // Auto-dismiss alert after 4 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);
  
  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    const trimmedEmail = formData.email.trim();
    
    // Email validation
    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous alerts
    setAlertMessage(null);
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Call API
    setLoading(true);
    
    try {
      const response = await authService.login(formData);
      
      // Show success message
      setAlertMessage({
        type: 'success',
        message: response.message || 'Login successful!'
      });
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      // Handle API errors
      console.error('Login error:', error);
      
      // Show error alert
      setAlertMessage({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Login failed. Please try again.'
      });
      
      // Handle validation errors from backend
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      }
      
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <Container maxWidth="sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <Card>
          {/* Alert Messages */}
          {alertMessage && (
            <Alert
              type={alertMessage.type}
              message={alertMessage.message}
              onClose={() => setAlertMessage(null)}
            />
          )}
          
          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <FormGroup
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              error={errors.email}
              required
            />
            
            {/* Password Field */}
            <FormGroup
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />
            
            {/* Forgot Password Link */}
            <div className="text-right mb-4">
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;