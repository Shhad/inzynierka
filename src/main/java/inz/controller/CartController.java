package inz.controller;

import inz.model.Cart;
import inz.repository.CartRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addCart(@RequestBody Cart cart) {
        JSONObject response = new JSONObject();
        try {
            cart.setCartId(cartRepository.getCount().intValue() + 1);
            cartRepository.saveAndFlush(cart);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/user/{userid}")
    public ResponseEntity<?> getUserCarts(@PathVariable("userid") int userid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", cartRepository.getUserCarts(userid));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/order/{orderid}")
    public ResponseEntity<?> getOrderCarts(@PathVariable("orderid") int orderid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", cartRepository.getOrderCart(orderid));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
