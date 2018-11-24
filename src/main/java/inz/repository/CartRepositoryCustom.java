package inz.repository;

import java.util.List;

import inz.model.Cart;

public interface CartRepositoryCustom {

	List<Cart> getUserCarts(int userid);
	List<Cart> getFavouriteCart(int favouriteid);
}
