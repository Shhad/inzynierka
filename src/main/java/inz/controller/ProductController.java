package inz.controller;

import inz.model.Product;
import inz.repository.ProductRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        JSONObject response = new JSONObject();
        try {
        	product.setProductId(new Integer((int)productRepository.count() + 1));
            productRepository.saveAndFlush(product);
            response.put("status", "ok");

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/promotions")
    public ResponseEntity<?> getPromotionProducts() {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllPromotionProducts());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/names/{name}")
    public ResponseEntity<?> getProductsNames(@PathVariable("name") String name ) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getProductsNames(name));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/products/{name}")
    public ResponseEntity<?> getProductsByName(@PathVariable("name") String name) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProducts(name));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/products/category/{category}")
    public ResponseEntity<?> getProductsFromCategory(@PathVariable("category") String category) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProductsFromCategory(category));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/products/shop/{shop}")
    public ResponseEntity<?> getProductsFromShop(@PathVariable("shop") String shop) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProductsFromShop(shop));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/products/favourite/{favouriteid}")
    public ResponseEntity<?> getProductsFromFavourite(@PathVariable("favouriteid") int favouriteid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProductsFromFavourite(favouriteid));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @GetMapping("/products/cart/{cartid}")
    public ResponseEntity<?> getProductsFromCart(@PathVariable("cartid") int cartid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProductsFromCart(cartid));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
    
    @PutMapping("/modify")
    public ResponseEntity<?> modifyProduct(@RequestBody Product product) {
    	JSONObject response = new JSONObject();
        try {
        	productRepository.modifyProduct(product);
        	
            response.put("status", "ok");

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
}
