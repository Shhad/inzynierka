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

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/ready")
    public ResponseEntity<?> checkIfSerwerReady() {
        JSONObject response = new JSONObject();
        response.put("status", "ok");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/checkexist")
    public ResponseEntity<?> checkIfUserExist(@RequestBody String body) {
        JSONObject response = new JSONObject();
        try {
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(body);

            if(userRepository.userExistByLogin(json.get("login").toString())) {
                response.put("status", "ok");
            } else {
                response.put("status", "failure");
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        System.out.println("body: " + user);
        JSONObject response = new JSONObject();
        try {
            user.setUserdId(userRepository.getCount().intValue() + 1);
            userRepository.saveAndFlush(user);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        JSONObject response = new JSONObject();
        System.out.println("body: " + user);
        System.out.println("body login: " + user.getLogin());
        System.out.println("body password: " + user.getPassword());
        try {
            if(userRepository.getUserByLogin(user.getLogin()) != null &&
                    userRepository.getUserByLogin(user.getLogin()).getPassword().equals(user.getPassword())) {
                response.put("status", "ok");
                response.put("data", userRepository.getUserByLogin(user.getLogin()));
            } else {
                response.put("status", "failure");
                response.put("msg", "No user with this login and password found!");
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            response.put("status", "failure");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping("/modify")
    public ResponseEntity<?> modifyUser(@RequestBody User user) {
        JSONObject response = new JSONObject();
        try {
            userRepository.updateUserPassword(user.getPassword(), user.getUserdId());

            response.put("status", "ok");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        JSONObject response = new JSONObject();
        try {
            //userRepository.delete(user);
            userRepository.deleteById(user.getUserdId());

            response.put("status", "ok");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
