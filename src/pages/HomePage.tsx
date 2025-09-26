import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            NAMASTE ↔ ICD11
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            FHIR-Compliant Medical Code Translation System
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Seamlessly translate between NAMASTE and ICD-11 code systems with integrated 
            SNOMED CT and LOINC mappings for comprehensive healthcare interoperability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Codes</h3>
            <p className="text-gray-600 mb-4">
              Search and explore medical codes in both NAMASTE and ICD-11 systems with intelligent autocomplete.
            </p>
            {user ? (
              <Link to="/search" className="btn-primary">
                Start Searching
              </Link>
            ) : (
              <Link to="/login" className="btn-primary">
                Login to Search
              </Link>
            )}
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Translate Codes</h3>
            <p className="text-gray-600 mb-4">
              Bidirectional translation between NAMASTE and ICD-11 with SNOMED CT and LOINC mappings.
            </p>
            {user ? (
              <Link to="/translate" className="btn-primary">
                Start Translating
              </Link>
            ) : (
              <Link to="/login" className="btn-primary">
                Login to Translate
              </Link>
            )}
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ABHA Integration</h3>
            <p className="text-gray-600 mb-4">
              Secure authentication with ABHA (Ayushman Bharat Health Account) and personal translation history.
            </p>
            {user ? (
              <Link to="/profile" className="btn-primary">
                View Profile
              </Link>
            ) : (
              <Link to="/login" className="btn-primary">
                Login with ABHA
              </Link>
            )}
          </div>
        </div>

        <div className="card max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            System Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Code Systems Supported</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  NAMASTE (National Medical Terminology System)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  ICD-11 TM2 (International Classification of Diseases)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  SNOMED CT (Systematized Nomenclature of Medicine)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  LOINC (Logical Observation Identifiers Names and Codes)
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Key Capabilities</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  FHIR-compliant API endpoints
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Bidirectional code translation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Intelligent search with autocomplete
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-3"></span>
                  Personal translation history tracking
                </li>
              </ul>
            </div>
          </div>
        </div>

        {!user && (
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4">
              Ready to get started? Sign in with your ABHA credentials.
            </p>
            <Link to="/login" className="btn-primary text-lg px-8 py-3">
              Sign In with ABHA
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;