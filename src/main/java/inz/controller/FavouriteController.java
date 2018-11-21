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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/favourite")
public class FavouriteController {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private FavouriteProductsRepository favouriteProductsRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addFavourite(@RequestBody Favourite favourite) {
        JSONObject response = new JSONObject();
        try {
            favourite.setFavouriteId(new Integer((int)favouriteRepository.count() + 1));
            favouriteRepository.saveAndFlush(favourite);

            response.put("status", "ok");

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
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
            favouriteProducts.setId(new Integer((int)favouriteProductsRepository.count() + 1));

            favouriteProductsRepository.saveAndFlush(favouriteProducts);

            response.put("status", "ok");

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
    }
}
