package inz.dao;

import inz.model.Category;

import java.math.BigInteger;
import java.util.List;

public interface CategoryDao {

    Category getCategory(BigInteger id);
    BigInteger saveCategory(Category Category);
    List<Category> getCategorys();
    void modifyCategory(Category Category);
    void deleteCategory(BigInteger id);
}
