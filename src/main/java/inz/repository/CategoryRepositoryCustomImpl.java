package inz.repository;

import inz.model.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class CategoryRepositoryCustomImpl implements CategoryRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public List<String> getCategoryNames(String name) {
        Query query = entityManager.createNativeQuery("SELECT DISTINCT * FROM inzynierka.category WHERE name LIKE ? + '%'", Category.class);
        query.setParameter(1, name);

        List<Category> queryResult = query.getResultList();
        final List<String> result = new ArrayList<String>();
        for(int i = 0; i < queryResult.size(); i++) {
            result.add(queryResult.get(i).getName());
        }

        return result;
    }
}
