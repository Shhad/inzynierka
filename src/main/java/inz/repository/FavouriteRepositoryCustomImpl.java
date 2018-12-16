package inz.repository;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import inz.model.Favourite;

@Repository
@Transactional(readOnly = true)
public class FavouriteRepositoryCustomImpl implements FavouriteRepositoryCustom {

	@Autowired
	EntityManager entityManager;

	@Override
	public List<Favourite> getUserFavourites(int userid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"favourite\" WHERE userid = ?", Favourite.class);
		query.setParameter(1, userid);

		return (List<Favourite>) query.getResultList();
	}

	@Override
	public BigInteger getCount() {
		Query query = entityManager.createNativeQuery("SELECT COUNT (*) FROM \"favourite\"");

		return (BigInteger)query.getSingleResult();
	}
}
