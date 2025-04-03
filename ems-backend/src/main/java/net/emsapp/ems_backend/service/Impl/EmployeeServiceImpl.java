package net.emsapp.ems_backend.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.emsapp.ems_backend.dto.EmployeeDto;
import net.emsapp.ems_backend.entity.Department;
import net.emsapp.ems_backend.entity.Employee;
import net.emsapp.ems_backend.exception.ResourceNotFoundException;
import net.emsapp.ems_backend.mapper.EmployeeMapper;
import net.emsapp.ems_backend.repository.DepartmentRepository;
import net.emsapp.ems_backend.repository.EmployeeRepository;
import net.emsapp.ems_backend.service.EmployeeService;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeRepository employeeRepository;

    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        // Extract department ID from the DepartmentDto
        if (employeeDto.getDepartment() == null || employeeDto.getDepartment().getId() == null) {
            throw new IllegalArgumentException("Department ID must not be null");
        }

        Department department = departmentRepository.findById(employeeDto.getDepartment().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with given id: " + employeeDto.getDepartment().getId()));

        employee.setDepartment(department);

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given id : " + employeeId));


        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees = employeeRepository.findAll();
        
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        // Extract department ID from the DepartmentDto
        if (updatedEmployee.getDepartment() == null || updatedEmployee.getDepartment().getId() == null) {
            throw new IllegalArgumentException("Department ID must not be null");
        }

        Department department = departmentRepository.findById(updatedEmployee.getDepartment().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with given id: " + updatedEmployee.getDepartment().getId()));

        employee.setDepartment(department);

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given id : " + employeeId));

        employeeRepository.deleteById(employeeId);  

    }

}
