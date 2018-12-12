package inz.repository;

import inz.model.*;

import java.util.List;

import org.springframework.stereotype.Repository;

public interface ProductRepositoryCustom {

    boolean modifyProduct(Product product);
    List<Product> getAllPromotionProducts();
    List<String> getProductsNames(String name);
    List<Product> getAllProducts(String name);
    List<Product> getAllProductsFromCategory(Category category);
    List<Product> getAllProductsFromCategory(int category);
    List<Product> getAllProductsFromShop(Shop shop);
    List<Product> getAllProductsFromShop(int shop);
    List<Product> getAllProductsFromFavourite(Favourite favourite);
    List<Product> getAllProductsFromCart(Cart cart);
    List<Product> getAllProductsFromFavourite(int favouriteid);
    List<Product> getAllProductsFromCart(int cartid);
    List<Product> getFromFilter(List<Integer> categories, List<Integer> shops, String name);
    int getCount();
}
