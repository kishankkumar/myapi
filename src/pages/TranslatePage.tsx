import React, { useState } from 'react';
import { mappingAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { ConceptMapMapping } from '../types/api';
import LoadingSpinner from '../components/LoadingSpinner';

const TranslatePage: React.FC = () => {
  const { user } = useAuth();
  const [code, setCode] = useState('');
  const [system, setSystem] = useState<'NAM' | 'TM2'>('NAM');
  const [saveHistory, setSaveHistory] = useState(false);
  const [mappings, setMappings] = useState<ConceptMapMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter a code to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    setMappings([]);

    try {
      const response = await mappingAPI.translateCode(
        system,
        code.trim(),
        saveHistory && !!user
      );
      
      setMappings(response.mappings || []);
      
      if (saveHistory && user && response.mappings.length > 0) {
        setSuccess('Translation completed and saved to your history!');
      } else if (response.mappings.length > 0) {
        setSuccess('Translation completed!');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Translation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Code Translation
        </h1>
        <p className="text-gray-600">
          Translate between NAMASTE and ICD-11 code systems with SNOMED CT and LOINC mappings
        </p>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleTranslate} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="code-input" className="block text-sm font-medium text-gray-700 mb-1">
                Code to Translate
              </label>
              <input
                id="code-input"
                type="text"
                className="input-field"
                placeholder="Enter code (e.g., 'NAM001' or 'MG30.00')"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="sm:w-48">
              <label htmlFor="system-select" className="block text-sm font-medium text-gray-700 mb-1">
                Source System
              </label>
              <select
                id="system-select"
                className="input-field"
                value={system}
                onChange={(e) => setSystem(e.target.value as 'NAM' | 'TM2')}
                disabled={isLoading}
              >
                <option value="NAM">NAMASTE</option>
                <option value="TM2">ICD-11 TM2</option>
              </select>
            </div>
          </div>

          {user && (
            <div className="flex items-center">
              <input
                id="save-history"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={saveHistory}
                onChange={(e) => setSaveHistory(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="save-history" className="ml-2 block text-sm text-gray-700">
                Save to translation history
              </label>
            </div>
          )}

          {error && (
            <div className="alert-error">
              {error}
            </div>
          )}

          {success && (
            <div className="alert-success">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !code.trim()}
            className="btn-primary flex items-center"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Translating...
              </>
            ) : (
              'Translate Code'
            )}
          </button>
        </form>
      </div>

      {mappings.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Translation Results ({mappings.length} found)
          </h2>
          
          <div className="space-y-4">
            {mappings.map((mapping, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Source → Target</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Source:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {mapping.source_code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Target:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {mapping.target_code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Relationship:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {mapping.relationship}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Additional Mappings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">SNOMED CT:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {mapping.snomed_ct_code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">LOINC:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {mapping.loinc_code}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && mappings.length === 0 && code && (
        <div className="card text-center py-8">
          <p className="text-gray-500">
            No translations found for code "{code}" in {system} system.
          </p>
        </div>
      )}
    </div>
  );
};

export default TranslatePage;