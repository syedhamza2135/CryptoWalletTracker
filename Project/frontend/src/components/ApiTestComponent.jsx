import React, { useState } from 'react';

const ApiTestComponent = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    try {
      // Test basic connection
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      setResult(`Backend reachable: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test123'
        })
      });
      
      const data = await response.json();
      setResult(`Login response: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '20px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxWidth: '400px',
      zIndex: 9999
    }}>
      <h3>API Test</h3>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={testBackendConnection} disabled={loading}>
          Test Backend Connection
        </button>
        <button onClick={testLogin} disabled={loading} style={{ marginLeft: '10px' }}>
          Test Login
        </button>
      </div>
      <pre style={{ 
        fontSize: '12px', 
        background: '#f5f5f5', 
        padding: '10px', 
        maxHeight: '200px', 
        overflow: 'auto',
        whiteSpace: 'pre-wrap'
      }}>
        {loading ? 'Testing...' : result}
      </pre>
    </div>
  );
};

export default ApiTestComponent;