import axios from 'axios';
import type {
  ABHALogin,
  ABHALoginResponse,
  ABHAUser,
  CodeSystemResponse,
  ConceptMapResponse,
  TranslationHistoryResponse
} from '../types/api';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (loginData: ABHALogin): Promise<ABHALoginResponse> => {
    const response = await api.post('/abha/login', loginData);
    return response.data;
  },

  getProfile: async (): Promise<ABHAUser> => {
    const response = await api.get('/abha/profile');
    return response.data;
  },

  getTranslationHistory: async (): Promise<TranslationHistoryResponse> => {
    const response = await api.get('/abha/translation-history');
    return response.data;
  },

  saveTranslation: async (translationData: any): Promise<{ message: string; entry_id: number }> => {
    const response = await api.post('/abha/save-translation', translationData);
    return response.data;
  },
};

export const searchAPI = {
  searchNamaste: async (query: string): Promise<CodeSystemResponse> => {
    const response = await api.get(`/namaste/namaste/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  searchICD: async (query: string): Promise<CodeSystemResponse> => {
    const response = await api.get(`/icd/icd11/tm2/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },
};

export const mappingAPI = {
  translateCode: async (
    system: string,
    code: string,
    saveHistory: boolean = false
  ): Promise<ConceptMapResponse> => {
    const response = await api.get(
      `/mapping/translate?system=${system}&code=${encodeURIComponent(code)}&save_history=${saveHistory}`
    );
    return response.data;
  },
};

export default api;