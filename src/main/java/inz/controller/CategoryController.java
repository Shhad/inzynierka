package inz.controller;

import inz.model.Category;
import inz.repository.CategoryRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/add")//dziala
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        JSONObject response = new JSONObject();
        try {
            category.setCategoryId(categoryRepository.getCount() + 1);
            categoryRepository.saveAndFlush(category);

            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/categories")//dziala
    public ResponseEntity<?> getCategories() {
    	JSONObject response = new JSONObject();
        try {
            response.put("status", "ok");
            response.put("data", categoryRepository.findAll());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status","failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
