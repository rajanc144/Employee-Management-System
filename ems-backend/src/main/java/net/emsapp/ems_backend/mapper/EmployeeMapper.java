package net.emsapp.ems_backend.mapper;

import net.emsapp.ems_backend.dto.DepartmentDto;
import net.emsapp.ems_backend.dto.EmployeeDto;
import net.emsapp.ems_backend.entity.Employee;

public class EmployeeMapper {

    /*  
        ***** EmployeeDto Method *****
        Converts an Employee entity (possibly from a database) into a DTO suitable for external use (e.g., sending as JSON in an API response).

        
        Useful for exposing data without revealing the full entity structure.
    */
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

    /*  
        ***** Employee Method *****
        Takes a EmployeeDto (e.g., received from an API request) and creates a Employee entity for persistence in the database.

        Useful for converting incoming data into a form suitable for JPA.
    */
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
