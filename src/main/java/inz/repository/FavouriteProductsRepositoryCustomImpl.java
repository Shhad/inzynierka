package inz.repository;

import inz.model.Favourite;
import inz.model.FavouriteProducts;
import inz.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;

@Repository
@Transactional
public class FavouriteProductsRepositoryCustomImpl implements FavouriteProductsRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public void deleteProduct(Product product, Favourite favourite) {
        Query query = entityManager.createNativeQuery("DELETE * FROM \"favouriteproducts\" WHERE favouriteid = ? AND productid = ?", FavouriteProducts.class);
        query.setParameter(1, favourite.getFavouriteId());
        query.setParameter(2, product.getProductId());
        query.executeUpdate();
    }

    @Override
    public void deleteProduct(Integer productid, Integer favouriteid) {
        Query query = entityManager.createNativeQuery("DELETE * FROM \"favouriteproducts\" WHERE favouriteid = ? AND productid = ?", FavouriteProducts.class);
        query.setParameter(1, favouriteid);
        query.setParameter(2, productid);
        query.executeUpdate();
    }

    @Override
    public void addProduct(Product product, Favourite favourite) {
        Query query = entityManager.createNativeQuery("INSERT INTO \"favouriteproducts\" (favouriteid, productid) VALUES (?,?)", Favourite.class);
        query.setParameter(1, favourite.getFavouriteId());
        query.setParameter(2, product.getProductId());
        query.executeUpdate();
    }

    @Override
    public void addProduct(Integer productid, Integer favouriteid) {
        Query query = entityManager.createNativeQuery("INSERT INTO \"favouriteproducts\" (favouriteid, productid) VALUES (?,?)", Favourite.class);
        query.setParameter(1, favouriteid);
        query.setParameter(2, productid);
        query.executeUpdate();
    }

    @Override
    public BigInteger getCount() {
        Query query = entityManager.createNativeQuery("SELECT COUNT (*) FROM \"favouriteproducts\"");

        return (BigInteger)query.getSingleResult();
    }
}
