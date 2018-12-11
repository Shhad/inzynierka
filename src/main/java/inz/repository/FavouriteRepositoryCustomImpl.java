package inz.repository;

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
	public List<Favourite> getAllFavourites() {
		/*Query q = entityManager.createNativeQuery("SELECT * FROM \"favourite\"", Favourite.class);
		List<Favourite> authors = q.getResultList();

		List<Favourite> result = new ArrayList<Favourite>();
		for (Favourite a : authors) {
			System.out.println("Name "
					+ a.getName()
					+ ", id  "
					+ a.getFavouriteId());
			Favourite toAdd = new Favourite();
			toAdd.setFavouriteId(a.getFavouriteId());
			toAdd.setName(a.getName());
			toAdd.setUserId(a.getUserId());

			result.add(toAdd);
		}
		return result;*/
		Query query = entityManager.createNativeQuery("SELECT * FROM favourite", "JediResult");
		@SuppressWarnings("unchecked")
		List<Favourite> samples = query.getResultList();
		return samples;
	}

	@Override
	public void addFavourite(Favourite favourite) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Favourite> getUserFavourites(int userid) {
		Query query = entityManager.createNativeQuery("SELECT f FROM favourite f WHERE f.userid = ?", Favourite.class);
		query.setParameter(1, userid);

		return (List<Favourite>) query.getResultList();
	}

	/*
	@Override
	List<Favourite> getAllFavourites() {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"favourite\"", Favourite.class);
	}
	*/
}
