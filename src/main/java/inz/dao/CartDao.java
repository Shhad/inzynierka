package inz.dao;

import inz.model.Cart;

import java.math.BigInteger;
import java.util.List;

public interface CartDao {

    Cart getCart(BigInteger id);
    BigInteger saveCart(Cart Cart);
    List<Cart> getCarts();
    void modifyCart(Cart Cart);
    void deleteCart(BigInteger id);
}
