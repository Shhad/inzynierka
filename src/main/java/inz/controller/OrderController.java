package inz.controller;

import inz.model.Order;
import inz.model.OrderProducts;
import inz.repository.OrderProductsRepository;
import inz.repository.OrderRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderProductsRepository orderProductsRepository;

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        JSONObject response = new JSONObject();
        try {
            System.out.println(order.getOrderId());
            System.out.println(orderRepository.getCount().intValue());
            order.setOrderId(orderRepository.getCount().intValue() + 1);
            orderRepository.saveAndFlush(order);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping("/add2")
    public ResponseEntity<?> addOrderProduct(@RequestBody OrderProducts body) {
        JSONObject response = new JSONObject();
        try {
            body.setId(orderProductsRepository.getCount().intValue() + 1);

            orderProductsRepository.saveAndFlush(body);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<?> getAllOrders() {
        JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", orderRepository.findAll());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/order/{userid}")
    public ResponseEntity<?> getUserOrders(@PathVariable("userid") String userid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", orderRepository.getUserOrders(Integer.parseInt(userid)));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{orderid}/{productid}")
    public ResponseEntity<?> deleteProductFromFavourite(@PathVariable("orderid") String orderid, @PathVariable("productid") String productid) {
    	JSONObject response = new JSONObject();
        try {
        	orderProductsRepository.deleteProduct(Integer.parseInt(productid), Integer.parseInt(orderid));

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
