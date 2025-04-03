import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';

const DepartmentFormComponent = () => {
  const { id } = useParams();
  const isUpdateMode = !!id;
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (isUpdateMode) {
      const fetchDepartment = async () => {
        setLoading(true);
        try {
          const response = await getDepartmentById(id);
          const department = response.data;
          setDepartmentName(department.departmentName);
          setDepartmentDescription(department.departmentDescription);
        } catch (err) {
          console.error('Error fetching department:', err);
          setErrors({ fetch: 'Failed to load department data. Please try again.' });
        } finally {
          setLoading(false);
        }
      };
      fetchDepartment();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!departmentName.trim()) newErrors.departmentName = 'Department name is required';
    if (!departmentDescription.trim()) newErrors.departmentDescription = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveDepartment = async () => {
    setLoading(true);
    setErrors({});
    const department = { departmentName, departmentDescription };
    try {
      if (isUpdateMode) {
        await updateDepartment(id, department);
      } else {
        await addDepartment(department);
      }
      navigator('/departments');
    } catch (err) {
      console.error(`Error ${isUpdateMode ? 'updating' : 'adding'} department:`, err);
      setErrors({ submit: `Failed to ${isUpdateMode ? 'update' : 'add'} department. Please try again.` });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    saveDepartment();
  };

  const handleCancel = () => {
    navigator('/departments');
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 text-center">{isUpdateMode ? 'Update Department' : 'Add New Department'}</h2>
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
              <label htmlFor="departmentName" className="form-label">
                Department Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Enter department name"
                disabled={loading}
              />
              {errors.departmentName && (
                <div className="invalid-feedback">{errors.departmentName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="departmentDescription" className="form-label">
                Description
              </label>
              <textarea
                className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                id="departmentDescription"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                placeholder="Enter description"
                rows="3"
                disabled={loading}
              />
              {errors.departmentDescription && (
                <div className="invalid-feedback">{errors.departmentDescription}</div>
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
                  isUpdateMode ? 'Update Department' : 'Add Department'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentFormComponent;