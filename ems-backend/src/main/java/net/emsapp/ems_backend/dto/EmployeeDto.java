package net.emsapp.ems_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    /*
        DTOs are used to transfer data between layers (e.g., from a database layer to a REST API), often to avoid exposing the full entity structure.
    */
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private DepartmentDto department;
}
