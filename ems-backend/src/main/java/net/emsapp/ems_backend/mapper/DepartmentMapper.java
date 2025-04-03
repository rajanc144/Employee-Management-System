package net.emsapp.ems_backend.mapper;

import net.emsapp.ems_backend.dto.DepartmentDto;
import net.emsapp.ems_backend.entity.Department;

public class DepartmentMapper {

    // Convert department jpa entity into department dto
    public static DepartmentDto mapToDepartmentDto(Department department){
        return new DepartmentDto(department.getId(), department.getDepartmentName(), department.getDepartmentDescription());
    }

    // Convert department dtos into department jpa entity
    public static Department mapToDepartment(DepartmentDto departmentDto){
        return new Department(departmentDto.getId(), departmentDto.getDepartmentName(), departmentDto.getDepartmentDescription());
    }
}
