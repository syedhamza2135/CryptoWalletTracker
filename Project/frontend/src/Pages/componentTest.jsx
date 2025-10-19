import React, { useState } from 'react';
import { Button, FormGroup, PasswordInput, Card, Label } from '../Components/Common';
import { Container, Header } from '../Components/Layout';

const ComponentTest = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Test validation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert('Form is valid! ✅\n\n' + JSON.stringify(formData, null, 2));
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Container maxWidth="lg" className="py-8">
        <h1 className="text-3xl font-bold mb-8">Component Test - PasswordInput</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Test Form with FormGroup (includes PasswordInput) */}
          <Card title="Registration Form (with PasswordInput)">
            <form onSubmit={handleSubmit}>
              
              <FormGroup
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                error={errors.name}
                required
              />
              
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
                            {/* Password with PasswordInput (via FormGroup) */}
              <FormGroup
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                error={errors.password}
                required
                helperText="Must be at least 8 characters"
              />
              
              {/* Confirm Password */}
              <FormGroup
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                required
              />
              <Button type="submit" variant="primary" fullWidth>
                Register
              </Button>
            </form>
          </Card>
          
          {/* Standalone PasswordInput Tests */}
          <div className="space-y-6">
            <Card title="PasswordInput - Standalone">
              <div className="space-y-4">
                {/* Normal State */}
                <div>
                  <Label htmlFor="test1">Normal State</Label>
                  <PasswordInput
                    id="test1"
                    name="test1"
                    placeholder="Type to see toggle"
                    value=""
                    onChange={() => {}}
                  />
                </div>
                
                {/* With Error */}
                <div>
                  <Label htmlFor="test2">With Error</Label>
                  <PasswordInput
                    id="test2"
                    name="test2"
                    placeholder="Password"
                    value=""
                    onChange={() => {}}
                    error="Password is too weak"
                  />
                  <p className="mt-1 text-sm text-red-600">Password is too weak</p>
                </div>
                
                {/* Disabled */}
                <div>
                  <Label htmlFor="test3">Disabled State</Label>
                  <PasswordInput
                    id="test3"
                    name="test3"
                    placeholder="Disabled"
                    value="DisabledPassword123"
                    onChange={() => {}}
                    disabled
                  />
                </div>
              </div>
            </Card>
            
            {/* Current Form State */}
            <Card title="Current Form State">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Form Data:</h3>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>
                
                {Object.keys(errors).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-600 mb-2">Errors:</h3>
                    <pre className="bg-red-50 p-4 rounded-lg text-sm overflow-auto">
                      {JSON.stringify(errors, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
        </div>
        
        {/* Usage Examples */}
        <Card title="PasswordInput Usage Examples" className="mt-8">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">With FormGroup (Recommended):</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`<FormGroup
  label="Password"
  name="password"
  type="password"
  value={password}
  onChange={handleChange}
  error={errors.password}
  required
/>`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Standalone Usage:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`<PasswordInput
  name="password"
  value={password}
  onChange={handleChange}
  placeholder="Enter password"
  error={errors.password}
/>`}
              </pre>
            </div>
          </div>
        </Card>
        
      </Container>
    </div>
  );
};

export default ComponentTest;
