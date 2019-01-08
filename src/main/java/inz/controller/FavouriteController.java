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

@CrossOrigin
@RestController
@RequestMapping("api/favourite")
public class FavouriteController {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private FavouriteProductsRepository favouriteProductsRepository;

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addFavourite(@RequestBody Favourite favourite) {
        JSONObject response = new JSONObject();
        try {
            System.out.println(favourite.getFavouriteId());
            System.out.println(favouriteRepository.getCount().intValue());
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

    @CrossOrigin
    @PostMapping("/add2")
    public ResponseEntity<?> addFavouriteProduct(@RequestBody FavouriteProducts body) {
        JSONObject response = new JSONObject();
        try {
            body.setId(favouriteProductsRepository.getCount().intValue() + 1);

            favouriteProductsRepository.saveAndFlush(body);

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

    @CrossOrigin
    @GetMapping("/favourites/{userid}")
    public ResponseEntity<?> getUserFavourites(@PathVariable("userid") String userid) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", favouriteRepository.getUserFavourites(Integer.parseInt(userid)));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{favouriteid}/{productid}")
    public ResponseEntity<?> deleteProductFromFavourite(@PathVariable("favouriteid") String favouriteid, @PathVariable("productid") String productid) {
    	JSONObject response = new JSONObject();
        try {
        	favouriteProductsRepository.deleteProduct(Integer.parseInt(productid), Integer.parseInt(favouriteid));

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
