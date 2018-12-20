package inz.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import inz.model.Shop;
import inz.repository.ShopRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/shop")
public class ShopController {

	@Autowired
	private ShopRepository shopRepository;

    @CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<?> addProduct(@RequestBody Shop shop) {
    	JSONObject response = new JSONObject();
        try {
        	shop.setShopId(shopRepository.getCount().intValue() + 1);
        	shopRepository.saveAndFlush(shop);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
	}

    @CrossOrigin
	@GetMapping("/shops")
	public ResponseEntity<?> getShops() {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", shopRepository.findAll());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
	}

    @CrossOrigin
	@GetMapping("/shops/{name}")
	public ResponseEntity<?> getShopsByName(@PathVariable("name") String name) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", shopRepository.getShopsByName(name));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
	}

    @CrossOrigin
	@GetMapping("/names/{name}")
	public ResponseEntity<?> getShopsNames(@PathVariable("name") String name) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", shopRepository.getShopsName(name));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
	}
}
