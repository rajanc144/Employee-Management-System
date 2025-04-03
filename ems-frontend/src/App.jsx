import './App.css';
import FooterComponent from './components/FooterComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx';
import ListEmployeeComponent from './components/ListEmployeeComponent.jsx';
import ListDepartmentComponent from './components/ListDepartmentComponent.jsx';
import EmployeeFormComponent from './components/EmployeeFormComponent.jsx';
import DepartmentFormComponent from './components/DepartmentFormComponent.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <HeaderComponent />
        <main className="flex-grow-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<ListEmployeeComponent />} />
              <Route path="/employees" element={<ListEmployeeComponent />} />
              <Route path="/departments" element={<ListDepartmentComponent />} />
              <Route path="/add-employee" element={<EmployeeFormComponent />} />
              <Route path="/update-employee/:id" element={<EmployeeFormComponent />} />
              <Route path="/add-department" element={<DepartmentFormComponent />} />
              <Route path="/update-department/:id" element={<DepartmentFormComponent />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;