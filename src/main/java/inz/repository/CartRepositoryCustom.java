package inz.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import inz.model.Cart;

@Repository
public interface CartRepositoryCustom {

	List<Cart> getUserCarts(Integer userid);
	List<Cart> getFavouriteCart(Integer favouriteid);
}
