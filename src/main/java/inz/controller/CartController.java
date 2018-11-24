package inz.controller;

import inz.model.Cart;
import inz.repository.CartRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addCart(@RequestBody Cart cart) {
        JSONObject response = new JSONObject();
        try {
            cart.setCartId(new Integer((int)cartRepository.count() + 1));
            cartRepository.saveAndFlush(cart);

            response.put("status", "ok");

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/user/{userid}")
    public ResponseEntity<?> getUserCarts(@PathVariable("userid") int userid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", cartRepository.getUserCarts(userid));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/favourite/{favouriteid}")
    public ResponseEntity<?> getFavouriteCarts(@PathVariable("favouriteid") int favouriteid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", cartRepository.getFavouriteCart(favouriteid));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
}
