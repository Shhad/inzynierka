package inz.dao;

import inz.model.Promotion;

import java.math.BigInteger;
import java.util.List;

public interface PromotionDao {

    Promotion getPromotion(BigInteger id);
    BigInteger savePromotion(Promotion Promotion);
    List<Promotion> getPromotions();
    void modifyPromotion(Promotion Promotion);
    void deletePromotion(BigInteger id);
}
