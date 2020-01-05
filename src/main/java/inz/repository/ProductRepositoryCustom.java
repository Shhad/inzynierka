package inz.repository;

import inz.model.*;

import java.math.BigInteger;
import java.util.List;

public interface ProductRepositoryCustom {

    boolean modifyProduct(Product product);
    List<Product> getAllPromotionProducts();
    List<String> getProductsNames(String name);
    List<Product> getAllProducts(String name);
    List<Product> getAllProductsFromCategory(Category category);
    List<Product> getAllProductsFromCategory(int category);
    List<Product> getAllProductsFromShop(Shop shop);
    List<Product> getAllProductsFromShop(int shop);
    List<Product> getAllProductsFromOrder(Order order);
    List<Product> getAllProductsFromCart(Cart cart);
    List<Product> getAllProductsFromOrder(int orderid);
    List<Product> getAllProductsFromCart(int cartid);
    List<Product> getFromFilter(List<Integer> categories, List<Integer> shops, String name);
    BigInteger getCount();
}
