package inz.repository;

import inz.model.ShopProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface ShopProductRepository extends JpaRepository<ShopProduct, Integer> {

}
