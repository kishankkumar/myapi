import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import type { TranslationHistoryEntry } from '../types/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<TranslationHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTranslationHistory();
  }, []);

  const loadTranslationHistory = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await authAPI.getTranslationHistory();
      setHistory(response.history || []);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load translation history');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="card text-center py-8">
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          User Profile
        </h1>
        <p className="text-gray-600">
          Your ABHA profile and translation history
        </p>
      </div>

      {/* User Profile Card */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ABHA Profile Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ABHA ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">
                  {user.abha_id}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.name}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.phone}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.dob}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.gender === 'M' ? 'Male' : 'Female'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <p className="mt-1 text-sm text-gray-900">
            {user.address}
          </p>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Account Created</label>
          <p className="mt-1 text-sm text-gray-900">
            {user.created_at}
          </p>
        </div>
      </div>

      {/* Translation History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Translation History
          </h2>
          <button
            onClick={loadTranslationHistory}
            disabled={isLoading}
            className="btn-secondary flex items-center"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Loading...
              </>
            ) : (
              'Refresh'
            )}
          </button>
        </div>

        {error && (
          <div className="alert-error mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : history.length > 0 ? (
          <div className="space-y-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {entry.source_system} → {entry.target_system}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Source:</span>
                    <span className="ml-1 font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                      {entry.source_code}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Target:</span>
                    <span className="ml-1 font-mono bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                      {entry.target_code}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">SNOMED:</span>
                    <span className="ml-1 font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">
                      {entry.snomed_ct_code}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">LOINC:</span>
                    <span className="ml-1 font-mono bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">
                      {entry.loinc_code}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No translation history found. Start translating codes to see your history here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;