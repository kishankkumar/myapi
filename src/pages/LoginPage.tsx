import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage: React.FC = () => {
  const { user, login, isLoading, error } = useAuth();
  const [abhaId, setAbhaId] = useState('');
  const [phone, setPhone] = useState('');
  const [localError, setLocalError] = useState('');

  if (user) {
    return <Navigate to="/search" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!abhaId.trim() || !phone.trim()) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      await login(abhaId.trim(), phone.trim());
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your ABHA account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your ABHA ID and phone number to access the system
          </p>
        </div>
        
        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {(error || localError) && (
              <div className="alert-error">
                {error || localError}
              </div>
            )}

            <div>
              <label htmlFor="abha-id" className="block text-sm font-medium text-gray-700">
                ABHA ID
              </label>
              <input
                id="abha-id"
                name="abha-id"
                type="text"
                required
                className="input-field mt-1"
                placeholder="Enter your ABHA ID (e.g., ABHA001)"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="input-field mt-1"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>ABHA001 - 9876543210 (Rajesh Kumar)</div>
              <div>ABHA002 - 9876543211 (Priya Sharma)</div>
              <div>ABHA003 - 9876543212 (Amit Singh)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;