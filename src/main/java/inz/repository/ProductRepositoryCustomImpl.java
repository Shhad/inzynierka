package inz.repository;

import inz.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public boolean modifyProduct(Product product) {
        try {
            Query query = entityManager.createNativeQuery("UPDATE \"product\" SET categoryid = ?, shopid = ?, name = ?, description = ?, price = ?, currency = ?, link = ? WHERE productid = ?", Product.class);
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
    public List<Product> getAllPromotionProducts() {
        Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE productid IN (SELECT DISTINCT productid FROM \"promotion\" WHERE productid IS NOT NULL) ORDER BY price DESC", Product.class);
        return query.getResultList();
    }

    @Override
    public List<String> getProductsNames(String name) {
        Query query = entityManager.createNativeQuery("SELECT DISTINCT * FROM \"product\" WHERE name LIKE CONCAT(?,'%')", Product.class);
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
        Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE name LIKE CONCAT('%', ?,'%') ORDER BY price DESC", Product.class);
        query.setParameter(1, name);

        return query.getResultList();
    }

    @Override
    public List<Product> getAllProductsFromCategory(Category category) {
        Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE categoryid = ?", Product.class);
        query.setParameter(1, category.getCategoryId());
        System.out.println(category.getDescription());
        category.setDescription(category.getDescription());

        return query.getResultList();
    }

    @Override
    public List<Product> getAllProductsFromShop(Shop shop) {
        Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE productid IN (SELECT DISTINCT productid FROM \"shop\"product WHERE shopid = ?)", Product.class);
        query.setParameter(1, shop.getShopId());

        return query.getResultList();
    }

    @Override
    public List<Product> getAllProductsFromOrder(Order order) {
        Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE productid IN (SELECT DISTINCT productid FROM \"orderproducts\" WHERE orderid = ?)", Product.class);
        query.setParameter(1, order.getOrderId());

        return query.getResultList();
    }

    @Override
    public List<Product> getAllProductsFromCart(Cart cart) {
        Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE productid IN (SELECT DISTINCT productid FROM \"orderproducts\" WHERE orderid = (SELECT orderid FROM \"cart\" WHERE cartid = ?))", Product.class);
        query.setParameter(1, cart.getCartId());

        return query.getResultList();
    }

	@Override
	public List<Product> getAllProductsFromCategory(int category) {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE categoryid = ?", Product.class);
		query.setParameter(1, category);

		return query.getResultList();
	}

	@Override
	public List<Product> getAllProductsFromShop(int shop) {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE shopid = ?", Product.class);
		query.setParameter(1, shop);

		return query.getResultList();
	}

	@Override
	public List<Product> getAllProductsFromOrder(int orderid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE productid IN (SELECT productid FROM \"orderproducts\" WHERE orderid = ?)", Product.class);
		query.setParameter(1, orderid);

		return query.getResultList();
	}

	@Override
	public List<Product> getAllProductsFromCart(int cartid) {
		Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE productid IN (SELECT productid FROM \"orderproducts\" WHERE favuriteid IN (SELECT orderid FROM \"cart\" WHERE cartid = ?))", Product.class);
		query.setParameter(1, cartid);

		return query.getResultList();
	}

    @Override
    public List<Product> getFromFilter(List<Integer> categories, List<Integer> shops, String name) {
        if(name == null) {
            Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE (categoryid IN (?1) AND shopid IN (?2) ) ORDER BY price DESC", Product.class);
            query.setParameter(1, categories);
            query.setParameter(2, shops);

            return query.getResultList();
        } else {
            Query query = entityManager.createNativeQuery("SELECT * FROM \"product\" WHERE (categoryid IN (?1) AND shopid IN (?2) AND name LIKE CONCAT('%',?3,'%')) ORDER BY price DESC", Product.class);
            query.setParameter(1, categories);
            query.setParameter(2, shops);
            query.setParameter(3, name);

            return query.getResultList();
        }
    }

    @Override
    public BigInteger getCount() {
        Query query = entityManager.createNativeQuery("SELECT COUNT (*) FROM \"product\"");

        return (BigInteger)query.getSingleResult();
    }
}
