package io.keepcoding.registro_perros_adopcion.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.keepcoding.registro_perros_adopcion.model.Perro;
import io.keepcoding.registro_perros_adopcion.service.PerroService;

import java.util.List;

@RestController
@RequestMapping("/api/perros")
public class PerroController {

	@Autowired
	private PerroService perroService;

	// Endpoint para obtener un perro por su ID
	@GetMapping("/{id}")
	public ResponseEntity<Perro> getPerroById(@PathVariable Long id) {
		Perro perro = perroService.getPerroById(id);
		if (perro != null) {
			return ResponseEntity.ok(perro);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Endpoint para obtener perros por nombre
	@GetMapping("/nombre/{nombre}")
	public List<Perro> getPerroByNombre(@PathVariable String nombre) {
		return perroService.getPerroByNombre(nombre);
	}

	// Endpoint para crear un nuevo perro con la opción de asignar un propietario
	@PostMapping
	public ResponseEntity<Perro> createPerro(@RequestBody Perro perro,
			@RequestParam(required = false) Long propietarioId) {
		Perro savedPerro = perroService.savePerro(perro, propietarioId);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedPerro);
	}

	@GetMapping
	public List<Perro> getAllPerros() {
	    List<Perro> perros = perroService.getAllPerrosWithPropietario();
	    return perros;
	}


	// Método para manejar la navegación a la página de los 20 perros más jóvenes
	@GetMapping("/youngest-perros")
	public List<Perro> getYoungestPerros() {
		return perroService.getYoungestPerros(20);
	}

	// Endpoint para obtener perros de forma paginada
	@GetMapping("/page")
	public Page<Perro> getPerrosPaged(@RequestParam int page) {
		Pageable pageable = PageRequest.of(page, 5);
		return perroService.getAllPerros(pageable);
	}

	// Endpoint para eliminar un perro por su ID
	@DeleteMapping("/{id}")
	public void deletePerro(@PathVariable Long id) {
		perroService.deletePerro(id);
	}
}
