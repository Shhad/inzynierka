package inz.controller;

import inz.model.User;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.Service;
import org.hibernate.service.ServiceRegistry;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Properties;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("api")
public class UserController {

    private static SessionFactory factory;

    public UserController() {
        try {
            Configuration configuration = new Configuration();

            Properties properties = new Properties();
            properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("hibernate.properties"));

            configuration.setProperties(properties);

            ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().
                    applySettings(configuration.getProperties()).build();

            SessionFactory factory = configuration.buildSessionFactory(serviceRegistry);

            Session session = factory.getCurrentSession();

            session.getTransaction().begin();

            System.out.println("Session Is Opened :: "+session.isOpen());
            System.out.println("Session Is Connected :: "+session.isConnected());

            session.getTransaction().commit();
            System.out.println("Hibernate configured!");
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
