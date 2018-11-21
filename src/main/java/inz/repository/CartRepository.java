package inz.repository;

import inz.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

}
