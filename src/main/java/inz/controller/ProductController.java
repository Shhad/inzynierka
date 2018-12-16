package inz.controller;

import inz.model.Favourite;
import inz.model.Product;
import inz.model.Shop;
import inz.repository.CategoryRepository;
import inz.repository.ProductRepository;
import inz.repository.ShopRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
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

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ShopRepository shopRepository;

    @PostMapping("/add")//dziala
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        JSONObject response = new JSONObject();
        try {
        	product.setProductId(productRepository.getCount().intValue() + 1);
            productRepository.saveAndFlush(product);
            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/promotions")//dziala
    public ResponseEntity<?> getPromotionProducts() {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllPromotionProducts());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/names/{name}")//dziala
    public ResponseEntity<?> getProductsNames(@PathVariable("name") String name ) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getProductsNames(name));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/products/{name}")//dziala
    public ResponseEntity<?> getProductsByName(@PathVariable("name") String name) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProducts(name));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/products/category/{category}")
    public ResponseEntity<?> getProductsFromCategory(@PathVariable("category") int category) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProductsFromCategory(category));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/products/shop/{shop}")
    public ResponseEntity<?> getProductsFromShop(@PathVariable("shop") int shop) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProductsFromShop(shop));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/products/favourite/{favouriteid}")
    public ResponseEntity<?> getProductsFromFavourite(@PathVariable("favouriteid") int favouriteid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProductsFromFavourite(favouriteid));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/products/cart/{cartid}")
    public ResponseEntity<?> getProductsFromCart(@PathVariable("cartid") int cartid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.getAllProductsFromCart(cartid));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/products/filter") //dziala
    public ResponseEntity<?> getProductsFromFilter(@RequestBody String body) {
        JSONObject response = new JSONObject();
        try {
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(body);

            List<Integer> categories = new ArrayList<Integer>();
            List<Integer> shops = new ArrayList<Integer>();

            JSONArray cat = (JSONArray) json.get("categories");
            Iterator i = cat.iterator();

            while (i.hasNext()) {
                JSONObject category = (JSONObject) i.next();
                String categoryid = category.get("categoryid").toString();
                System.out.println(categoryid);
                categories.add(Integer.parseInt(categoryid));
            }

            JSONArray sh = (JSONArray) json.get("shops");
            i = sh.iterator();

            while (i.hasNext()) {
                JSONObject shop = (JSONObject) i.next();
                String shopid = shop.get("shopid").toString();
                System.out.println(shopid);
                shops.add(Integer.parseInt(shopid));
            }

            response.put("status", "ok");
            response.put("data", productRepository.getFromFilter(categories, shops, json.get("name").toString()));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @PutMapping("/modify")
    public ResponseEntity<?> modifyProduct(@RequestBody Product product) {
    	JSONObject response = new JSONObject();
        try {
        	productRepository.modifyProduct(product);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }


}
