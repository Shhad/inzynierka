package inz.repository;

import org.springframework.stereotype.Repository;

import inz.model.Favourite;
import inz.model.Product;

import java.math.BigInteger;

public interface FavouriteProductsRepositoryCustom {

    void deleteProduct(Product product, Favourite favourite);
    void deleteProduct(Integer productid, Integer favouriteid);
    void addProduct(Product product, Favourite favourite);
    void addProduct(Integer productid, Integer favouriteid);
    BigInteger getCount();
}
