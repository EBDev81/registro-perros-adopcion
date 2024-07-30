package io.keepcoding.registro_perros_adopcion.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import io.keepcoding.registro_perros_adopcion.model.Perro;
import io.keepcoding.registro_perros_adopcion.model.Propietario;
import io.keepcoding.registro_perros_adopcion.data.PerroRepository;
import io.keepcoding.registro_perros_adopcion.data.PropietarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PerroService {

    @Autowired
    private PerroRepository perroRepository;
    
    @Autowired
    private PropietarioRepository propietarioRepository;

    public Perro getPerroById(Long id) {
        return perroRepository.findById(id).orElse(null);
    }


    public List<Perro> getPerroByNombre(String nombre) {
        return perroRepository.findByNombreIgnoreCase(nombre);
    }

    // Guardar perro con la opción de asignar propietario
    public Perro savePerro(Perro perro, Long propietarioId) {
        if (propietarioId != null) {
            Optional<Propietario> propietario = propietarioRepository.findById(propietarioId);
            propietario.ifPresent(perro::setPropietario);
        }
        return perroRepository.save(perro);
    }
   
 // Método para obtener los perros más jóvenes
    public List<Perro> getYoungestPerros(int count) {
        Pageable pageable = PageRequest.of(0, count, Sort.by(Sort.Direction.ASC, "fechaNac"));
        return perroRepository.findAll(pageable).getContent();
    }

    public Page<Perro> getAllPerros(Pageable pageable) {
        return perroRepository.findAll(pageable);
    }

    public void deletePerro(Long id) {
        perroRepository.deleteById(id);
    }
          
    public List<Perro> getAllPerrosWithPropietario() {
        List<Perro> perros = perroRepository.findAllWithPropietario();
        return perros;
    }
}
