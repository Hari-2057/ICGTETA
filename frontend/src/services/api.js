import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const api = {
  getHealth: async () => {
    const res = await axios.get(`${API_BASE_URL}/health`);
    return res.data;
  },

  getModelInfo: async () => {
    const res = await axios.get(`${API_BASE_URL}/model-info`);
    return res.data;
  },

  getPresets: async () => {
    const res = await axios.get(`${API_BASE_URL}/presets`);
    return res.data;
  },

  predict: async (labData) => {
    const res = await axios.post(`${API_BASE_URL}/predict`, labData);
    return res.data;
  },

  generateReport: async (labData) => {
    const res = await axios.post(`${API_BASE_URL}/generate-report`, labData, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Clinical_CDSS_Diabetes_Report_${Date.now()}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
