package inz.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.stereotype.Repository;

import inz.model.Cart;

public interface CartRepositoryCustom {

	List<Cart> getUserCarts(Integer userid);
	List<Cart> getOrderCart(Integer orderid);
	BigInteger getCount();
}
