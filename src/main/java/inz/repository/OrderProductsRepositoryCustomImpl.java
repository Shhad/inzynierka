package inz.repository;

import inz.model.Order;
import inz.model.OrderProducts;
import inz.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;

@Repository
@Transactional
public class OrderProductsRepositoryCustomImpl implements OrderProductsRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public void deleteProduct(Product product, Order order) {
        Query query = entityManager.createNativeQuery("DELETE FROM \"orderproducts\" WHERE orderid = ? AND productid = ?", OrderProducts.class);
        query.setParameter(1, order.getOrderId());
        query.setParameter(2, product.getProductId());
        query.executeUpdate();
    }

    @Override
    public void deleteProduct(Integer productid, Integer orderid) {
        Query query = entityManager.createNativeQuery("DELETE FROM \"orderproducts\" WHERE (orderid = ? AND productid = ?)", OrderProducts.class);
        query.setParameter(1, orderid);
        query.setParameter(2, productid);
        query.executeUpdate();
    }

    @Override
    public void addProduct(Product product, Order order) {
        Query query = entityManager.createNativeQuery("INSERT INTO \"orderproducts\" (orderid, productid) VALUES (?,?)", Order.class);
        query.setParameter(1, order.getOrderId());
        query.setParameter(2, product.getProductId());
        query.executeUpdate();
    }

    @Override
    public void addProduct(Integer productid, Integer orderid) {
        Query query = entityManager.createNativeQuery("INSERT INTO \"orderproducts\" (orderid, productid) VALUES (?,?)", Order.class);
        query.setParameter(1, orderid);
        query.setParameter(2, productid);
        query.executeUpdate();
    }

    @Override
    public BigInteger getCount() {
        Query query = entityManager.createNativeQuery("SELECT COUNT (*) FROM \"orderproducts\"");

        return (BigInteger)query.getSingleResult();
    }
}
