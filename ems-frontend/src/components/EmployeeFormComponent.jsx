import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployeeById, updateEmployee, listDepartments } from '../services/EmployeeService';

const EmployeeFormComponent = () => {
  const { id } = useParams();
  const isUpdateMode = !!id;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(null); // Store the selected department object
  const [departments, setDepartments] = useState([]); // List of departments for the dropdown
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  // Fetch departments for the dropdown
  const fetchDepartments = async () => {
    try {
      const response = await listDepartments();
      setDepartments(response.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setErrors({ fetch: 'Failed to load departments. Please try again.' });
    }
  };

  useEffect(() => {
    fetchDepartments(); // Fetch departments on component mount

    if (isUpdateMode) {
      const fetchEmployee = async () => {
        setLoading(true);
        try {
          const response = await getEmployeeById(id);
          const employee = response.data;
          setFirstName(employee.firstName);
          setLastName(employee.lastName);
          setEmail(employee.email);
          setDepartment(employee.department || null); // Set the department (or null if none)
        } catch (err) {
          console.error('Error fetching employee:', err);
          setErrors({ fetch: 'Failed to load employee data. Please try again.' });
        } finally {
          setLoading(false);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!department) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveEmployee = async () => {
    setLoading(true);
    setErrors({});
    const employee = { firstName, lastName, email, department };
    try {
      if (isUpdateMode) {
        await updateEmployee(id, employee);
      } else {
        await addEmployee(employee);
      }
      navigator('/employees');
    } catch (err) {
      console.error(`Error ${isUpdateMode ? 'updating' : 'adding'} employee:`, err);
      setErrors({ submit: `Failed to ${isUpdateMode ? 'update' : 'add'} employee. Please try again.` });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    saveEmployee();
  };

  const handleCancel = () => {
    navigator('/employees');
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 text-center">{isUpdateMode ? 'Update Employee' : 'Add New Employee'}</h2>
        </div>
        <div className="card-body">
          {errors.fetch && (
            <div className="alert alert-danger" role="alert">
              {errors.fetch}
            </div>
          )}
          {errors.submit && (
            <div className="alert alert-danger" role="alert">
              {errors.submit}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                disabled={loading}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                disabled={loading}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                disabled={loading}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <select
                className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                id="department"
                value={department ? department.id : ''}
                onChange={(e) => {
                  const selectedDept = departments.find((dept) => dept.id === parseInt(e.target.value));
                  setDepartment(selectedDept || null);
                }}
                disabled={loading}
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
              {errors.department && (
                <div className="invalid-feedback">{errors.department}</div>
              )}
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </>
                ) : (
                  isUpdateMode ? 'Update Employee' : 'Add Employee'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormComponent;