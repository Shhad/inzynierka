package inz.repository;

import inz.model.Shop;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class ShopRepositoryCustomImpl implements ShopRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void addShop(Shop shop) {
        /*Query query = entityManager.createNativeQuery("INSERT INTO inzynierka.shop (name, localization, street, number, country, city, telnumber, site) VALUES (?,?,?,?,?,?,?,?)", Shop.class);
        query.setParameter(1, shop.getName());
        query.setParameter(2, shop.getLocalization());
        query.setParameter(3, shop.getStreet());
        query.setParameter(4, shop.getNumber());
        query.setParameter(5, shop.getCountry());
        query.setParameter(6, shop.getCity());
        query.setParameter(7, shop.getTelnumber());
        query.setParameter(8, shop.getSite());
        */
        entityManager.getTransaction().begin();
        entityManager.persist(shop);
        entityManager.getTransaction().commit();
    }

    @Override
    public List<Shop> getShopsByName(String name) {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.shop WHERE name LIKE ? + '%'", Shop.class);
        query.setParameter(1, name);

        return query.getResultList();
    }

    @Override
    public List<String> getShopsName(String name) {
        Query query = entityManager.createNativeQuery("SELECT DISTINCT * FROM inzynierka.shop WHERE name LIKE ? + '%'", Shop.class);
        query.setParameter(1, name);

        List<Shop> queryResult = query.getResultList();
        final List<String> result = new ArrayList<String>();
        for(int i = 0; i < queryResult.size(); i++) {
            result.add(queryResult.get(i).getName());
        }
        return result;
    }


}
