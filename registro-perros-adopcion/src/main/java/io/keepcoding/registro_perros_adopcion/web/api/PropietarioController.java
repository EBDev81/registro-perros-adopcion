package io.keepcoding.registro_perros_adopcion.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.keepcoding.registro_perros_adopcion.model.Propietario;
import io.keepcoding.registro_perros_adopcion.service.PropietarioService;

import java.util.List;

@RestController
@RequestMapping("/api/propietarios")

public class PropietarioController {

    @Autowired
    private PropietarioService propietarioService;

    @GetMapping("/{id}")
    public Propietario getPropietarioById(@PathVariable Long id) {
        return propietarioService.getPropietarioById(id);
    }

    @PostMapping
    public Propietario createPropietario(@RequestBody Propietario propietario) {
        return propietarioService.savePropietario(propietario);
    }

    @GetMapping
    public List<Propietario> getAllPropietarios() {
        return propietarioService.getAllPropietarios();
    }

    @DeleteMapping("/{id}")
    public void deletePropietario(@PathVariable Long id) {
        propietarioService.deletePropietario(id);
    }
}