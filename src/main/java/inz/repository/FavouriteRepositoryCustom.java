package inz.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.stereotype.Repository;

import inz.model.Favourite;

public interface FavouriteRepositoryCustom {

    List<Favourite> getUserFavourites(int userid);
    BigInteger getCount();
}
