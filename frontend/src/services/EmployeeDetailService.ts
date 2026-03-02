import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const getEmployeeById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/employees/${id}`);
  return data;
};

export const getEmployeeAttendance = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/attendance/${id}/`);
  return data; 
};

export const updateAttendanceStatus = async (logId: string, newStatus: string) => {
  const { data } = await axios.put(`${API_URL}/attendance/update/${logId}/`, { status: newStatus });
  return data;
};

/**
 * Creates a new attendance record for a specific employee.
 * @param payload - Object containing employeeId, date, and status
 */
export const createAttendanceRecord = async (payload: { employee_id: string; date: string; status: string }) => {
  // Mapping frontend keys to common backend naming conventions (e.g., employee_id or employee)
  const formattedPayload = {
    employee_id: payload.employee_id,
    date: payload.date,
    status: payload.status,
  };

  const { data } = await axios.post(`${API_URL}/attendance/${payload.employee_id}/`, formattedPayload);
  return data;
};

export const deleteAttendanceRecord = async (logId: string) => {
  await axios.delete(`${API_URL}/attendance/delete/${logId}/`);
};