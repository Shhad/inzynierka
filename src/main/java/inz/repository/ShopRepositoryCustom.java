package inz.repository;

import inz.model.Shop;

import java.math.BigInteger;
import java.util.List;

import org.springframework.stereotype.Repository;

public interface ShopRepositoryCustom {

    List<Shop> getShopsByName(String name);
    List<String> getShopsName(String name);
    BigInteger getCount();
}
