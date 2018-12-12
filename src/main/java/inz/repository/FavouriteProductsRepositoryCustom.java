package inz.repository;

import org.springframework.stereotype.Repository;

import inz.model.Favourite;
import inz.model.Product;

public interface FavouriteProductsRepositoryCustom {

    void deleteProduct(Product product, Favourite favourite);
    void deleteProduct(Integer productid, Integer favouriteid);
    void addProduct(Product product, Favourite favourite);
    void addProduct(Integer productid, Integer favouriteid);
    int getCount();
}
