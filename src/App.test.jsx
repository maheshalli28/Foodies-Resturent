import React from "react";

// Simple test component to check if React is working
function TestApp() {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Restaurant App Test</h1>
      <p className="text-center">If you can see this, React is working!</p>
      <div className="alert alert-success">
        <h4>✅ Frontend is working!</h4>
        <p>This is a test to verify the basic React setup is functioning.</p>
      </div>
    </div>
  );
}

export default TestApp;
