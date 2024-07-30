package io.keepcoding.registro_perros_adopcion.web.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    // Método para manejar la navegación a la página principal
    @GetMapping("/")
    public String home() {
        return "home";
    }
    
    // Método para manejar la navegación a la página de propietarios
    @GetMapping("/propietarios")
    public String propietarios() {
        return "list-propietarios";
    }
    
    // Método para manejar la navegación a la página de lista de perros
    @GetMapping("/lista-perros")
    public String listaPerros() {
        return "lista-perros";
    }
    
    // Método para manejar la navegación a la página de registro de perros
    @GetMapping("/reg-perros")
    public String regPerros() {
        return "reg-perros";
    }
    
    // Método para manejar la navegación a la página de los 20 perros más jóvenes
    @GetMapping("/youngest-perros")
    public String youngestPerros() {
        return "youngest-perros";
    }
}
