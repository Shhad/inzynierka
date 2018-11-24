package inz.repository;

import inz.model.Shop;

import java.util.List;

import org.springframework.stereotype.Repository;

public interface ShopRepositoryCustom {

    void addShop(Shop shop);
    List<Shop> getShopsByName(String name);
    List<String> getShopsName(String name);
}
