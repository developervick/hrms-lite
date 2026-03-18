import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getEmployees = async (date?: string) => {
  const url = date ? `${API_URL}/employees/?date=${date}` : `${API_URL}/employees/`;
  const { data } = await axios.get(url);
  return data;
};

export const createEmployee = async (employee: { name: string; email: string; dept: string }) => {
  const { data } = await axios.post(`${API_URL}/employees/`, employee);
  return data;
};

export const deleteEmployee = async (id: string) => {
  await axios.delete(`${API_URL}/employees/${id}/`);
};

