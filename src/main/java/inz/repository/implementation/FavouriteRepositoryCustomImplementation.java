package inz.repository.implementation;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;

import inz.repository.FavouriteRepositoryCustom;
import inz.model.Favourite;

public class FavouriteRepositoryCustomImplementation implements FavouriteRepositoryCustom {

	@Autowired
	EntityManager entityManager;

	@Override
	public List<Favourite> getAllFavourites() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addFavourite(Favourite favourite) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Favourite> getUserFavourites(int userid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.favourite WHERE userid = ?", Favourite.class);
		query.setParameter(1, userid);
		
		return query.getResultList();
	}
	
	/*
	@Override
	List<Favourite> getAllFavourites() {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.favourite", Favourite.class);
	}
	*/
}
