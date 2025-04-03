import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listEmployees, deleteEmployee } from '../services/EmployeeService'; // Fix import name

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listEmployees(); // Use correct function name
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employees. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  function addNewEmployee() {
    navigator('/add-employee');
  }

  function updateEmployee(id) {
    navigator(`/update-employee/${id}`);
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((employee) => employee.id !== id));
      } catch (err) {
        console.error('Error deleting employee:', err);
        setError('Failed to delete employee. Please try again.');
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Employee List</h2>
          <button
            type="button"
            className="btn add-employee-btn"
            onClick={addNewEmployee}
          >
            Add Employee
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-danger">
                <p>{error}</p>
                <button className="btn btn-primary" onClick={fetchEmployees}>
                  Retry
                </button>
              </div>
            ) : (
              <table
                className="table table-hover mb-0 table-striped table-bordered align-middle text-center"
                role="grid"
              >
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="py-3">ID</th>
                    <th scope="col" className="py-3">First Name</th>
                    <th scope="col" className="py-3">Last Name</th>
                    <th scope="col" className="py-3">Email</th>
                    <th scope="col" className="py-3">Department</th>
                    <th scope="col" className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                      <tr key={employee.id} className="align-middle">
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>
                          <a
                            href={`mailto:${employee.email}`}
                            className="text-primary"
                            title={`Email ${employee.firstName} ${employee.lastName}`}
                          >
                            {employee.email}
                          </a>
                        </td>
                        <td>{employee.department ? employee.department.departmentName : 'N/A'}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => updateEmployee(employee.id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(employee.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;