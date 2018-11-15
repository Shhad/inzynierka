package inz.repository;

import inz.model.FavouriteProducts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface FavouriteProductsRepository extends JpaRepository<FavouriteProducts, BigInteger> {

}
