package inz.repository.implementation;

import inz.model.Favourite;
import inz.model.FavouriteProducts;
import inz.model.Product;
import inz.repository.FavouriteProductsRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.Query;

public class FavouriteProductsRepositoryCustomImplementation implements FavouriteProductsRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public void deleteProduct(Product product, Favourite favourite) {
        Query query = entityManager.createNativeQuery("DELETE * FROM inzynierka.favouriteproducts WHERE favouriteid = ? AND productid = ?", FavouriteProducts.class);
        query.setParameter(1, favourite.getFavouriteId());
        query.setParameter(2, product.getProductId());
        query.executeUpdate();
    }

    @Override
    public void addProduct(Product product, Favourite favourite) {
        Query query = entityManager.createNativeQuery("INSERT INTO inzynierka.favouriteproducts (favouriteid, productid) VALUES (?,?)", Favourite.class);
        query.setParameter(1, favourite.getFavouriteId());
        query.setParameter(2, product.getProductId());
        query.executeUpdate();
    }

    @Override
    public void addProduct(String productid, String favouriteid) {
        Query query = entityManager.createNativeQuery("INSERT INTO inzynierka.favouriteproducts (favouriteid, productid) VALUES (?,?)", Favourite.class);
        query.setParameter(1, favouriteid);
        query.setParameter(2, productid);
        query.executeUpdate();
    }
}
