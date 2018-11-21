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
	
	/*
	@Override
	List<Favourite> getAllFavourites() {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.favourite", Favourite.class);
	}
	*/
}
