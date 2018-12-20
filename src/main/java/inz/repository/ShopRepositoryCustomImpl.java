package inz.repository;

import inz.model.Shop;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class ShopRepositoryCustomImpl implements ShopRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public BigInteger getCount() {
        Query query = entityManager.createNativeQuery(
                "SELECT COUNT (*) FROM \"shop\"");

        return (BigInteger)query.getSingleResult();
    }

    @Override
    public List<Shop> getShopsByName(String name) {
        Query query = entityManager.createNativeQuery(
                "SELECT * FROM \"shop\" WHERE name LIKE CONCAT(?,'%')", Shop.class);
        query.setParameter(1, name);

        return query.getResultList();
    }

    @Override
    public List<String> getShopsName(String name) {
        Query query = entityManager.createNativeQuery(
                "SELECT DISTINCT * FROM \"shop\" WHERE name LIKE CONCAT(?,'%')", Shop.class);
        query.setParameter(1, name);

        return query.getResultList();
    }
}
