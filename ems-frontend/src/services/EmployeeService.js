import axios from 'axios';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees';
const DEPARTMENT_API_BASE_URL = 'http://localhost:8080/api/departments';

export const listEmployees = () => {
  return axios.get(EMPLOYEE_API_BASE_URL);
};

export const addEmployee = (employee) => {
  return axios.post(EMPLOYEE_API_BASE_URL, employee);
};

export const getEmployeeById = (id) => {
  return axios.get(`${EMPLOYEE_API_BASE_URL}/${id}`);
};

export const updateEmployee = (id, employee) => {
  return axios.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employee);
};

export const deleteEmployee = (id) => {
  return axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`);
};

export const listDepartments = () => {
  return axios.get(DEPARTMENT_API_BASE_URL);
};