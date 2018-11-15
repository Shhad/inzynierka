package inz.controller;

import inz.model.User;
import inz.repository.UserRepository;
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

    public UserController() {


    }

    @GetMapping("/ready")
    public ResponseEntity<?> checkIfSerwerReady() {
        return new ResponseEntity<String>("READY", HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/xd", method = RequestMethod.GET)
    public ResponseEntity<?> checkIfSerwerReady2() {
        return new ResponseEntity<>(new String("READY"), HttpStatus.OK);
    }
}
