package inz.repository;

import inz.model.Shop;

import java.util.List;

import org.springframework.stereotype.Repository;

public interface ShopRepositoryCustom {

    List<Shop> getShopsByName(String name);
    List<String> getShopsName(String name);
    int getCount();
}
