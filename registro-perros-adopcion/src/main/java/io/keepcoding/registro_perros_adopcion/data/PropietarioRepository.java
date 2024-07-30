package io.keepcoding.registro_perros_adopcion.data;

import org.springframework.data.repository.CrudRepository;

import io.keepcoding.registro_perros_adopcion.model.Propietario;

public interface PropietarioRepository extends CrudRepository<Propietario, Long> {
}
