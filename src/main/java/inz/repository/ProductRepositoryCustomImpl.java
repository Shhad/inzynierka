package inz.repository;

import inz.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public boolean modifyProduct(Product product) {
        try {
            Query query = entityManager.createNativeQuery("UPDATE inzynierka.product SET categoryid = ?, shopid = ?, name = ?, description = ?, price = ?, currency = ?, link = ? WHERE productid = ?", Product.class);
            query.setParameter(1, product.getCategoryId());
            query.setParameter(2, product.getShopId());
            query.setParameter(3, product.getName());
            query.setParameter(4, product.getDescription());
            query.setParameter(5, product.getPrice());
            query.setParameter(6, product.getCurrency());
            query.setParameter(7, product.getLink());
            query.setParameter(8, product.getProductId());
            query.executeUpdate();
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public void addProduct(Product product) {

        Query query = entityManager.createNativeQuery("INSERT  INTO inzynierka.product (categoryid, shopid, name, description, price, currency, link) VALUES (?,?,?,?,?,?,?)", Product.class);
        query.setParameter(1, product.getCategoryId());
        query.setParameter(2, product.getShopId());
        query.setParameter(3, product.getName());
        query.setParameter(4, product.getDescription());
        query.setParameter(5, product.getPrice());
        query.setParameter(6, product.getCurrency());
        query.setParameter(7, product.getLink());
        /*
        entityManager.getTransaction().begin();
        entityManager.persist(product);
        entityManager.getTransaction().commit();
        */
    }

    @Override
    public List<Product> getAllPromotionProducts() {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE productid IN (SELECT DISTINCT productid FROM inzynierka.promotion WHERE productid IS NOT NULL )", Product.class);
        return query.getResultList();
    }

    @Override
    public List<String> getProductsNames(String name) {
        Query query = entityManager.createNativeQuery("SELECT DISTINCT * FROM inzynierka.product WHERE name LIKE ? + '%'", Product.class);
        query.setParameter(1, name);

        List<Product> queryResult = query.getResultList();
        final List<String> result = new ArrayList<String>();
        for(int i = 0; i < queryResult.size(); i++) {
            result.add(queryResult.get(i).getName());
        }

        return result;
    }

    @Override
    public List<Product> getAllProducts(String name) {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE name LIKE ? + '%'", Product.class);
        query.setParameter(1, name);

        return query.getResultList();
    }

    @Override
    public List<Product> getAllProductsFromCategory(Category category) {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE categoryid = ?", Product.class);
        query.setParameter(1, category.getCategoryId());

        return query.getResultList();
    }

    @Override
    public List<Product> getAllProductsFromShop(Shop shop) {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE productid IN (SELECT DISTINCT productid FROM inzynierka.shopproduct WHERE shopid = ?)", Product.class);
        query.setParameter(1, shop.getShopId());

        return query.getResultList();
    }

    @Override
    public List<Product> getAllProductsFromFavourite(Favourite favourite) {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE productid IN (SELECT DISTINCT productid FROM inzynierka.favouriteproducts WHERE favouriteid = ?)", Product.class);
        query.setParameter(1, favourite.getFavouriteId());

        return query.getResultList();
    }

    @Override
    public List<Product> getAllProductsFromCart(Cart cart) {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE productid IN (SELECT DISTINCT productid FROM inzynierka.favouriteproducts WHERE favouriteid = (SELECT favouriteid FROM inzynierka.cart WHERE cartid = ?))", Product.class);
        query.setParameter(1, cart.getCartId());

        return query.getResultList();
    }

	@Override
	public List<Product> getAllProductsFromCategory(String category) {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE categoryid = (SELECT categoryid FROM inzynierka.category WHERE name = ?)", Product.class);
		query.setParameter(1, category);
		
		return query.getResultList();
	}
	
	@Override
	public List<Product> getAllProductsFromShop(String shop) {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE shopid = (SELECT categoryid FROM inzynierka.shop WHERE name = ?)", Product.class);
		query.setParameter(1, shop);
		
		return query.getResultList();
	}

	@Override
	public List<Product> getAllProductsFromFavourite(int favouriteid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE productid IN (SELECT productid FROM inzynierka.favouriteproducts WHERE favouriteid = ?)", Product.class);
		query.setParameter(1, favouriteid);
		
		return query.getResultList();
	}

	@Override
	public List<Product> getAllProductsFromCart(int cartid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.product WHERE productid IN (SELECT productid FROM inzynierka.favouriteproducts WHERE favuriteid IN (SELECT favouriteid FROM inzynierka.cart WHERE cartid = ?))", Product.class);
		query.setParameter(1, cartid);
		
		return query.getResultList();
	}


}
