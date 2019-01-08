package inz.repository;

import inz.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;

@Repository
@Transactional
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public User getUserByLogin(String login) {
        System.out.println(login);
        Query query = entityManager.createNativeQuery("SELECT * FROM \"users\" WHERE login LIKE CONCAT(?)", User.class);
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
    public void updateUserMail(String mail, String name, String surname, String login, Integer id) {
        Query query = entityManager.createNativeQuery("UPDATE \"users\" SET mail = ?, name = ?, surname = ?, login = ? WHERE userid = ?", User.class);
        query.setParameter(1, mail);
        query.setParameter(2, name);
        query.setParameter(3, surname);
        query.setParameter(4, login);
        query.setParameter(5, id);
        query.executeUpdate();
    }

    @Override
    public void updateUserPassword(String pass, Integer id) {
        Query query = entityManager.createNativeQuery("UPDATE \"users\" SET password = ? WHERE userid = ?", User.class);
        query.setParameter(1, pass);
        query.setParameter(2, id);
        query.executeUpdate();
    }

    @Override
    public BigInteger getCount() {
        Query query = entityManager.createNativeQuery("SELECT COUNT (*) FROM \"users\"");

        return (BigInteger) query.getSingleResult();
    }
}

