package net.emsapp.ems_backend.mapper;

import net.emsapp.ems_backend.dto.DepartmentDto;
import net.emsapp.ems_backend.dto.EmployeeDto;
import net.emsapp.ems_backend.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        DepartmentDto departmentDto = employee.getDepartment() != null
                ? new DepartmentDto(
                        employee.getDepartment().getId(),
                        employee.getDepartment().getDepartmentName(),
                        employee.getDepartment().getDepartmentDescription())
                : null;

        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                departmentDto
        );
    }
    
    public static Employee mapToEmployee (EmployeeDto employeeDto){
        Employee empoloyee = new Employee();
        empoloyee.setId(employeeDto.getId());
        empoloyee.setFirstName(employeeDto.getFirstName());
        empoloyee.setLastName(employeeDto.getLastName());
        empoloyee.setEmail(employeeDto.getEmail()
        );

        return empoloyee;
    }
}
