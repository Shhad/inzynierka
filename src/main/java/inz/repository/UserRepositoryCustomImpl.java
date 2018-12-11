package inz.repository;

import inz.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public User getUserByLogin(String login) {
        Query query = entityManager.createNativeQuery("SELECT * FROM \"users\" WHERE login = ?", User.class);
        query.setParameter(1, login);

        return (User) query.getResultList().get(0);
    }

    @Override
    public boolean userExistByLogin(String login) {
        Query query = entityManager.createNativeQuery("SELECT * FROM \"users\" WHERE login = ?", User.class);
        query.setParameter(1, login);

        if(query.getResultList().isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public void updateUserMail(String mail, Integer id) {
        Query query = entityManager.createNativeQuery("UPDATE \"users\" SET mail = ? WHERE id = ?", User.class);
        query.setParameter(1, mail);
        query.setParameter(2, id);
        query.executeUpdate();
    }

    @Override
    public void updateUserPassword(String pass, Integer id) {
        Query query = entityManager.createNativeQuery("UPDATE \"users\" SET password = ? WHERE id = ?", User.class);
        query.setParameter(1, pass);
        query.setParameter(2, id);
        query.executeUpdate();
    }
}

