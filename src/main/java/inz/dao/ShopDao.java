package inz.dao;

import inz.model.Shop;

import java.math.BigInteger;
import java.util.List;

public interface ShopDao {

    Shop getShop(BigInteger id);
    BigInteger saveShop(Shop shop);
    List<Shop> getShops();
    void modifyShop(Shop shop);
    void deleteShop(BigInteger id);
}
