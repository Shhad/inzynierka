package inz.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import inz.model.Shop;
import inz.repository.ShopRepository;

public class ShopController {
	
	@Autowired
	private ShopRepository shopRepository;
	
	@PostMapping("/add")
	public ResponseEntity<?> addProduct(@RequestBody Shop shop) {
    	JSONObject response = new JSONObject();
        try {
        	shop.setShopId(new Integer((int) shopRepository.count() + 1));
        	shopRepository.saveAndFlush(shop);
        	
            response.put("status", "ok");

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
	}
	
	@GetMapping("/shops")
	public ResponseEntity<?> getShops() {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", shopRepository.findAll());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
	}
	
	@GetMapping("/shops/{name}")
	public ResponseEntity<?> getShopsByName(@PathVariable("name") String name) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", shopRepository.getShopsByName(name));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
	}
	
	@GetMapping("/names/{name}")
	public ResponseEntity<?> getShopsNames(@PathVariable("name") String name) {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", shopRepository.getShopsNames(name));

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<String>(response.toJSONString(), HttpStatus.OK);
        }
	}
}
