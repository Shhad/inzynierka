package inz.repository;

import inz.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, BigInteger> {

}
