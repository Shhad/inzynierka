package inz.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.stereotype.Repository;

public interface CategoryRepositoryCustom {

    List<String> getCategoryNames(String name);
    BigInteger getCount();
}
