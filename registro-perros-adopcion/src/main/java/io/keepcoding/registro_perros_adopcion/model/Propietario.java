package io.keepcoding.registro_perros_adopcion.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import lombok.Data;

@Data
@Entity
public class Propietario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String nombre;

    // Relación One-to-Many con la entidad Perro
    // mappedBy indica que la entidad Perro es la propietaria de la relación
    @OneToMany(mappedBy = "propietario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Ignoramos esta propiedad para evitar recursión infinita
    private List<Perro> perros;
}

