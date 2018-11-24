package inz.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import inz.model.Favourite;

public interface FavouriteRepositoryCustom {

	List<Favourite> getAllFavourites();
    void addFavourite(Favourite favourite);
    List<Favourite> getUserFavourites(int userid);
}
