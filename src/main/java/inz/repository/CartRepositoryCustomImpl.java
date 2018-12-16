package inz.repository;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import inz.model.Cart;

@Repository
@Transactional(readOnly = true)
public class CartRepositoryCustomImpl implements CartRepositoryCustom {

	@Autowired
	EntityManager entityManager;

	@Override
	public List<Cart> getUserCarts(Integer userid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM cart WHERE favouriteid IN (SELECT favouriteid FROM \"favourite\" WHERE userid = ?)", Cart.class);
		query.setParameter(1, userid);

		return query.getResultList();
	}

	@Override
	public List<Cart> getFavouriteCart(Integer favouriteid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"cart\" WHERE favouriteid = ?", Cart.class);
		query.setParameter(1, favouriteid);

		return query.getResultList();
	}

	@Override
	public BigInteger getCount() {
		Query query = entityManager.createNativeQuery("SELECT COUNT(*) FROM \"cart\"");

		return (BigInteger)query.getSingleResult();
	}

}
