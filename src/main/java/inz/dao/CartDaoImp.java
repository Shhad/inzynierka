package inz.dao;

import inz.model.Cart;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigInteger;
import java.util.List;

public class CartDaoImp implements CartDao{

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public Cart getCart(BigInteger id) {
        return sessionFactory.getCurrentSession().get(Cart.class, id);
    }

    @Override
    public BigInteger saveCart(Cart Cart) {
        return null;
    }

    @Override
    public List<Cart> getCarts() {
        return null;
    }

    @Override
    public void modifyCart(Cart Cart) {

    }

    @Override
    public void deleteCart(BigInteger id) {

    }
}
