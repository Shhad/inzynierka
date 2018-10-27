package inz.dao;

import inz.model.Product;

import java.math.BigInteger;
import java.util.List;

public interface ProductDao {

    Product getProduct(BigInteger id);
    BigInteger saveProduct(Product Product);
    List<Product> getProducts();
    void modifyProduct(Product Product);
    void deleteProduct(BigInteger id);
}
