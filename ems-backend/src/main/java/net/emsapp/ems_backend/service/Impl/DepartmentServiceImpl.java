package net.emsapp.ems_backend.service.Impl;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.emsapp.ems_backend.dto.DepartmentDto;
import net.emsapp.ems_backend.entity.Department;
import net.emsapp.ems_backend.exception.ResourceNotFoundException;
import net.emsapp.ems_backend.mapper.DepartmentMapper;
import net.emsapp.ems_backend.repository.DepartmentRepository;
import net.emsapp.ems_backend.service.DepartmentService;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService{

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {

        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department =  departmentRepository.findById(departmentId).orElseThrow(() -> new ResourceNotFoundException("Department is not exists with a given id: " + departmentId));

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {

        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map((department) -> DepartmentMapper.mapToDepartmentDto(department)).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {

        Department department = departmentRepository.findById(departmentId).orElseThrow(() -> new ResourceNotFoundException("Department is not exists with a given id: " + departmentId));

        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());


        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {

        departmentRepository.findById(departmentId).orElseThrow(() -> new ResourceNotFoundException("Department is not exists with a given id " + departmentId));

        departmentRepository.deleteById(departmentId);
    }
    
}
