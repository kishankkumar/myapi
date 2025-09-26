import React, { useState } from 'react';
import { searchAPI } from '../services/api';
import type { CodeSystemConcept } from '../types/api';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'namaste' | 'icd'>('namaste');
  const [results, setResults] = useState<CodeSystemConcept[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const response = searchType === 'namaste' 
        ? await searchAPI.searchNamaste(query.trim())
        : await searchAPI.searchICD(query.trim());
      
      setResults(response.concepts || []);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Code System Search
        </h1>
        <p className="text-gray-600">
          Search for medical codes in NAMASTE or ICD-11 systems
        </p>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search-query" className="block text-sm font-medium text-gray-700 mb-1">
                Search Term
              </label>
              <input
                id="search-query"
                type="text"
                className="input-field"
                placeholder="Enter code or description (e.g., 'fever', 'NAM001')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="sm:w-48">
              <label htmlFor="search-type" className="block text-sm font-medium text-gray-700 mb-1">
                System
              </label>
              <select
                id="search-type"
                className="input-field"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'namaste' | 'icd')}
                disabled={isLoading}
              >
                <option value="namaste">NAMASTE</option>
                <option value="icd">ICD-11</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="alert-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="btn-primary flex items-center"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Search Results ({results.length} found)
          </h2>
          
          <div className="space-y-3">
            {results.map((concept, index) => (
              <div
                key={`${concept.code}-${index}`}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {concept.code}
                      </span>
                      <span className="font-medium text-gray-900">
                        {concept.display}
                      </span>
                    </div>
                    {concept.definition && (
                      <p className="text-sm text-gray-600 mt-1">
                        {concept.definition}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && results.length === 0 && query && (
        <div className="card text-center py-8">
          <p className="text-gray-500">
            No results found for "{query}" in {searchType.toUpperCase()} system.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;