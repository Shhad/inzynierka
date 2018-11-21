package inz.repository;

import inz.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Integer>, ShopRepositoryCustom {
}
