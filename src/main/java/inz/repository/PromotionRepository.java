package inz.repository;

import inz.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {

}
