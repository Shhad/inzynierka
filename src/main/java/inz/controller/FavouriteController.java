package inz.controller;

import inz.model.Favourite;
import inz.model.FavouriteProducts;
import inz.repository.FavouriteProductsRepository;
import inz.repository.FavouriteRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/favourite")
public class FavouriteController {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private FavouriteProductsRepository favouriteProductsRepository;

    @PostMapping("/add")//dziala
    public ResponseEntity<?> addFavourite(@RequestBody Favourite favourite) {
        JSONObject response = new JSONObject();
        try {
            favourite.setFavouriteId(favouriteRepository.getCount().intValue() + 1);
            favouriteRepository.saveAndFlush(favourite);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @PostMapping("/add2")
    public ResponseEntity<?> addFavouriteProduct(@RequestBody String body) {
        JSONObject response = new JSONObject();
        try {
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(body);

            FavouriteProducts favouriteProducts = new FavouriteProducts();
            favouriteProducts.setFavouriteId(new Integer(json.get("favouriteid").toString()));
            favouriteProducts.setFavouriteId(new Integer(json.get("productid").toString()));
            favouriteProducts.setId(favouriteProductsRepository.getCount().intValue() + 1);

            favouriteProductsRepository.saveAndFlush(favouriteProducts);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/all")//zwraca referencje
    @ResponseBody
    public ResponseEntity<?> getAllFavourites() {
        JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", favouriteRepository.findAll());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/favourites/{userid}")//zwraca referencje
    public ResponseEntity<?> getUserFavourites(@PathVariable("userid") int userid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", favouriteRepository.getUserFavourites(userid));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{favouriteid}/{productid}")
    public ResponseEntity<?> deleteProductFromFavourite(@PathVariable("favouriteid") int favouriteid, @PathVariable("productid") int productid) {
    	JSONObject response = new JSONObject();
        try {
        	favouriteProductsRepository.deleteProduct(productid, favouriteid);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
