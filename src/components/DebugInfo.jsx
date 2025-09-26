import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const DebugInfo = () => {
  const { user, loading, token } = useAuth();
  
  return (
    <div className="position-fixed top-0 end-0 p-2 bg-dark text-white" style={{zIndex: 9999, fontSize: '12px'}}>
      <div>Loading: {loading ? 'Yes' : 'No'}</div>
      <div>User: {user ? user.name : 'None'}</div>
      <div>Token: {token ? 'Present' : 'None'}</div>
      <div>API: {process.env.NODE_ENV}</div>
    </div>
  );
};

export default DebugInfo;
