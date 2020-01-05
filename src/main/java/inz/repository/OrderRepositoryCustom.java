package inz.repository;

import java.math.BigInteger;
import java.util.List;

import inz.model.Order;

public interface OrderRepositoryCustom {

    List<Order> getUserOrders(int userid);
    BigInteger getCount();
}
