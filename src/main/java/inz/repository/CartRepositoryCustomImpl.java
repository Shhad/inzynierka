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
@Transactional
public class CartRepositoryCustomImpl implements CartRepositoryCustom {

	@Autowired
	EntityManager entityManager;

	@Override
	public List<Cart> getUserCarts(Integer userid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM cart WHERE orderid IN (SELECT orderid FROM \"order\" WHERE userid = ?)", Cart.class);
		query.setParameter(1, userid);

		return query.getResultList();
	}

	@Override
	public List<Cart> getOrderCart(Integer orderid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"cart\" WHERE orderid = ?", Cart.class);
		query.setParameter(1, orderid);

		return query.getResultList();
	}

	@Override
	public BigInteger getCount() {
		Query query = entityManager.createNativeQuery("SELECT COUNT(*) FROM \"cart\"");

		return (BigInteger)query.getSingleResult();
	}

}
