package inz.repository;

import inz.model.*;

import java.util.List;

public interface ProductRepositoryCustom {

    boolean modifyProduct(Product product);
    void addProduct(Product product);
    List<Product> getAllPromotionProducts();
    List<String> getProductsNames(String name);
    List<Product> getAllProducts(String name);
    List<Product> getAllProductsFromCategory(Category category);
    List<Product> getAllProductsFromCategory(String category);
    List<Product> getAllProductsFromShop(Shop shop);
    List<Product> getAllProductsFromShop(String shop);
    List<Product> getAllProductsFromFavourite(Favourite favourite);
    List<Product> getAllProductsFromCart(Cart cart);
    List<Product> getAllProductsFromFavourite(int favouriteid);
    List<Product> getAllProductsFromCart(int cartid);
}
