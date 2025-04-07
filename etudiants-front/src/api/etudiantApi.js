import axios from 'axios';

const API_URL = 'http://localhost:8081/api/etudiants';

export const fetchEtudiants = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEtudiant = async (etudiantData) => {
  const response = await axios.post(API_URL, etudiantData);
  return response.data;
};

export const updateEtudiant = async (numEt, etudiantData) => {

    
  const response = await axios.put(`${API_URL}/${numEt.numEt}`, numEt);
  return response.data;
};

export const deleteEtudiant = async (numEt) => {
  const response = await axios.delete(`${API_URL}/${numEt}`);
  return response.data;
};