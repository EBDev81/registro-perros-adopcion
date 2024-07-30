package io.keepcoding.registro_perros_adopcion.data;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import io.keepcoding.registro_perros_adopcion.model.Perro;

public interface PerroRepository extends PagingAndSortingRepository<Perro, Long> {

    @EntityGraph(attributePaths = "propietario")
    Optional<Perro> findById(Long id);

    @EntityGraph(attributePaths = "propietario")
    @Query("SELECT p FROM Perro p WHERE LOWER(p.nombre) = LOWER(:nombre)")
    List<Perro> findByNombreIgnoreCase(@Param("nombre") String nombre);

    @EntityGraph(attributePaths = "propietario")
    @Query("SELECT p FROM Perro p LEFT JOIN FETCH p.propietario")
    List<Perro> findAllWithPropietario();
    
    Page<Perro> findAll(Pageable pageable);
}