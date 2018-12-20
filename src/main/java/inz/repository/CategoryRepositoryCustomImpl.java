package inz.repository;

import inz.model.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class CategoryRepositoryCustomImpl implements CategoryRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public List<String> getCategoryNames(String name) {
        Query query = entityManager.createNativeQuery("SELECT DISTINCT * FROM \"category\" WHERE name LIKE CONCAT(?,'%')", Category.class);
        query.setParameter(1, name);

        List<Category> queryResult = query.getResultList();
        final List<String> result = new ArrayList<String>();
        for(int i = 0; i < queryResult.size(); i++) {
            result.add(queryResult.get(i).getName());
        }

        return result;
    }

    @Override
    public BigInteger getCount() {
        Query query = entityManager.createNativeQuery("SELECT COUNT (*) FROM \"category\"");

        return (BigInteger)query.getSingleResult();
    }
}
