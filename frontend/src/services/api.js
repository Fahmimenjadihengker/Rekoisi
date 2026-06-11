import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 20000,
})

export const getStats = () => api.get('/stats').then((response) => response.data)
export const getPoems = (params) => api.get('/poems', { params }).then((response) => response.data)
export const getPoem = (id) => api.get(`/poems/${id}`).then((response) => response.data)
export const getRecommendations = (id, params) =>
  api.get(`/poems/${id}/recommendations`, { params }).then((response) => response.data)
export const getEvaluationSummary = () => api.get('/evaluation-summary').then((response) => response.data)
export const evaluatePoem = (payload) => api.post('/evaluate', payload).then((response) => response.data)
