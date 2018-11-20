package inz.repository;

import inz.model.Shop;

import java.util.List;

public interface ShopRepositoryCustom {

    void addShop(Shop shop);
    List<Shop> getShopsByName(String name);
    List<String> getShopsNames(String name);
}
