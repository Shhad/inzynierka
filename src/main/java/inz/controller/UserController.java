package inz.controller;

import inz.model.User;
import inz.repository.UserRepository;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/ready")
    public ResponseEntity<?> checkIfSerwerReady() {
        return new ResponseEntity<String>("READY", HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createUser(@RequestBody String body) {
        User newUser = new User();
        JSONObject response = new JSONObject();
        try {
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(body);

            newUser.setAdmin(false);
            newUser.setLogin(json.get("login").toString());
            newUser.setMail(json.get("mail").toString());
            newUser.setName(json.get("name").toString());
            newUser.setPassword(json.get("password").toString());
            newUser.setSurname(json.get("surname").toString());

            userRepository.save(newUser);

            response.put("status", "ok");

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);

        } catch (Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }

    @PutMapping("/login")
    public ResponseEntity<?> login(@RequestBody String body) {
        JSONObject response = new JSONObject();

        try {
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(body);

            if(userRepository.getUserByLogin(json.get("login").toString()) != null) {
                response.put("status", "ok");
                //TODO: create session
            } else {
                response.put("status", "failure");
                response.put("msg", "No user with this login and password found!");
            }

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status", "failure");
            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        JSONObject response = new JSONObject();
        try {
            userRepository.delete(user);

            response.put("status", "ok");
            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
}
