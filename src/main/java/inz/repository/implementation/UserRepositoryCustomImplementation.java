package inz.repository.implementation;

import inz.model.User;
import inz.repository.UserRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public class UserRepositoryCustomImplementation implements UserRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public User getUserByLogin(String login) {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.users WHERE login = ?", User.class);
        query.setParameter(1, login);

        return (User) query.getResultList().get(0);
    }

    @Override
    public boolean userExistByLogin(String login) {
        Query query = entityManager.createNativeQuery("SELECT * FROM inzynierka.users WHERE login = ?", User.class);
        query.setParameter(1, login);

        if(query.getResultList().isEmpty()) {
            return false;
        }
        return true;
    }
}
