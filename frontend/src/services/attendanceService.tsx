import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all attendance records for a specific date
export const getAttendance = async (selectedDate: string) => {
  const { data } = await axios.get(`${API_URL}/attendance/`, {
    params: { date: selectedDate }
  });
  return data; // Expected: [{id, employee_name, department, status, employee_id}, ...]
};

// Update an existing record's status
export const updateAttendanceStatus = async (attandance_id: string, status: string) => {
  const { data } = await axios.put(`${API_URL}/attendance/update/${attandance_id}/`, { status });
  return data;
};
