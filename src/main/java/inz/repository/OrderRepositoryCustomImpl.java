package inz.repository;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import inz.model.Order;

@Repository
@Transactional
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {

	@Autowired
	EntityManager entityManager;

	@Override
	public List<Order> getUserOrders(int userid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"order\" WHERE userid = ?", Order.class);
		query.setParameter(1, userid);

		return (List<Order>) query.getResultList();
	}

	@Override
	public BigInteger getCount() {
		Query query = entityManager.createNativeQuery("SELECT COUNT (*) FROM \"order\"");

		return (BigInteger)query.getSingleResult();
	}
}
