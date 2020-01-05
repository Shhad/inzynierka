package inz.repository;

import inz.model.Order;
import inz.model.Product;

import java.math.BigInteger;

public interface OrderProductsRepositoryCustom {

    void deleteProduct(Product product, Order order);
    void deleteProduct(Integer productid, Integer orderid);
    void addProduct(Product product, Order order);
    void addProduct(Integer productid, Integer orderid);
    BigInteger getCount();
}
