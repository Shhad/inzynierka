package inz.controller;

import inz.model.Category;
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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ShopRepository shopRepository;

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        JSONObject response = new JSONObject();
        try {
            System.out.println(productRepository.getCount().intValue());
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

    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<?> getProducts() {
        JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", productRepository.findAll());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/promotions")
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

    @CrossOrigin
    @GetMapping("/names/{name}")
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

    @CrossOrigin
    @GetMapping("/products/{name}")
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

    @CrossOrigin
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

    @CrossOrigin
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

    @CrossOrigin
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

    @CrossOrigin
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

    @CrossOrigin
    @PostMapping("/products/filter")
    public ResponseEntity<?> getProductsFromFilter(@RequestBody String body) {
        JSONObject response = new JSONObject();
        System.out.println("body: " + body);
        try {
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(body);

            List<Integer> categories = new ArrayList<Integer>();
            List<Integer> shops = new ArrayList<Integer>();

            System.out.println("Body: " + body);

            JSONArray cat = (JSONArray) json.get("categories");

            if(cat.size() == 0) {
                System.out.println("categories null");
                List<Category> categoriesAll = categoryRepository.findAll();
                Iterator i = categoriesAll.iterator();

                while(i.hasNext()) {
                    categories.add(((Category) i.next()).getCategoryId());
                }
            } else {
                Iterator i = cat.iterator();

                while (i.hasNext()) {
                    JSONObject category = (JSONObject) i.next();
                    String categoryid = category.get("categoryId").toString();
                    System.out.println(categoryid);
                    categories.add(Integer.parseInt(categoryid));
                }
            }

            JSONArray sh = (JSONArray) json.get("shops");

            if(sh.size() == 0) {
                System.out.println("shops null");
                List<Shop> shopsAll = shopRepository.findAll();
                Iterator i = shopsAll.iterator();

                while(i.hasNext()) {
                    shops.add(((Shop) i.next()).getShopId());
                }
            } else {
                Iterator i = sh.iterator();

                while (i.hasNext()) {
                    JSONObject shop = (JSONObject) i.next();
                    String shopid = shop.get("shopId").toString();
                    System.out.println(shopid);
                    shops.add(Integer.parseInt(shopid));
                }
            }

            System.out.println("Name: " + json.get("name").toString());

            response.put("status", "ok");
            response.put("data", productRepository.getFromFilter(categories, shops, json.get("name").toString()));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
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
