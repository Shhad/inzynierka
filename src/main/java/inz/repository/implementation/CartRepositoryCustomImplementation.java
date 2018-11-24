package inz.repository.implementation;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;

import inz.model.Cart;
import inz.repository.CartRepositoryCustom;

public class CartRepositoryCustomImplementation implements CartRepositoryCustom {

	@Autowired
	EntityManager entityManager;
	
	@Override
	public List<Cart> getUserCarts(Integer userid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.cart WHERE favouriteid = (SELECT favouriteid FROM inzynierka.favourite WHERE userid = ?)", Cart.class);
		query.setParameter(1, userid);
		
		return query.getResultList();
	}

	@Override
	public List<Cart> getFavouriteCart(Integer favouriteid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.cart WHERE favouriteid = ?", Cart.class);
		query.setParameter(1, favouriteid);
		
		return query.getResultList();
	}

}
