package inz.repository;

import java.util.List;

import inz.model.Favourite;

public interface FavouriteRepositoryCustom {

	List<Favourite> getAllFavourites();
    void addFavourite(Favourite favourite);
}
