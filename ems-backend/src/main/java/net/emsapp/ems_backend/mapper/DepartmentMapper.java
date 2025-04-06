package net.emsapp.ems_backend.mapper;

import net.emsapp.ems_backend.dto.DepartmentDto;
import net.emsapp.ems_backend.entity.Department;

public class DepartmentMapper {

    /*  
        ***** DepartmentDto Method *****
        Takes a Department entity (e.g., retrieved from a database) and creates a DepartmentDto for use elsewhere (e.g., sending as JSON in an API response).

        Useful for exposing data without revealing the full entity structure.
    */
    public static DepartmentDto mapToDepartmentDto(Department department){
        return new DepartmentDto(department.getId(), department.getDepartmentName(), department.getDepartmentDescription());
    }

    /*  
        ***** Department Method *****
        Takes a DepartmentDto (e.g., received from an API request) and creates a Department entity for persistence in the database.

        Useful for converting incoming data into a form suitable for JPA.
    */
    public static Department mapToDepartment(DepartmentDto departmentDto){
        return new Department(departmentDto.getId(), departmentDto.getDepartmentName(), departmentDto.getDepartmentDescription());
    }
}
