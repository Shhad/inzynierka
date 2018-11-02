package inz.controller;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("api")
public class UserController {

    private static SessionFactory factory;

    public UserController() {
        try {
            factory = new Configuration().configure().buildSessionFactory();
        } catch(Exception e) {
            System.out.println("Hibernate factory not initialized.");
            e.printStackTrace();
        }

    }

    @GetMapping("/ready")
    public ResponseEntity<?> checkIfSerwerReady() {
        return new ResponseEntity<String>("READY", HttpStatus.OK);
    }
}
