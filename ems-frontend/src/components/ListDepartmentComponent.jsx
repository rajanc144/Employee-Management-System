import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listDepartments, deleteDepartment } from '../services/DepartmentService';

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listDepartments();
      setDepartments(response.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError('Failed to load departments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  function addNewDepartment() {
    navigator('/add-department');
  }

  function updateDepartment(id) {
    navigator(`/update-department/${id}`);
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
        setDepartments(departments.filter((department) => department.id !== id));
      } catch (err) {
        console.error('Error deleting department:', err);
        setError('Failed to delete department. Please try again.');
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Department List</h2>
          <button
            type="button"
            className="btn add-employee-btn"
            onClick={addNewDepartment}
          >
            Add Department
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
                <button className="btn btn-primary" onClick={fetchDepartments}>
                  Retry
                </button>
              </div>
            ) : (
              <table
                className="table table-hover mb-0 table-striped table-bordered align-middle"
                role="grid"
              >
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="py-3">ID</th>
                    <th scope="col" className="py-3">Department Name</th>
                    <th scope="col" className="py-3">Description</th>
                    <th scope="col" className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.length > 0 ? (
                    departments.map((department) => (
                      <tr key={department.id} className="align-middle">
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => updateDepartment(department.id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(department.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">
                        No departments found
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

export default ListDepartmentComponent;