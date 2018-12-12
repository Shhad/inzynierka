package inz.controller;

import inz.model.Promotion;
import inz.repository.PromotionRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

    @Autowired
    PromotionRepository promotionRepository;

    @PostMapping("/add")//dziala
    public ResponseEntity<?> addPromotion(@RequestBody Promotion promotion) {
        JSONObject response = new JSONObject();
        try {
            promotion.setPromotionId(new Integer((int)promotionRepository.count() + 1));
            promotionRepository.saveAndFlush(promotion);
            response.put("status", "ok");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e) {
            response.put("status", "failure");
            response.put("msg", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

}
