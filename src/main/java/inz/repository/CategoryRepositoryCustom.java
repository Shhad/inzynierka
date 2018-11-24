package inz.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

public interface CategoryRepositoryCustom {

    List<String> getCategoryNames(String name);
}
