package net.kalars.rest.restfulws.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoJpaRepository extends JpaRepository<Todo, Long> {
    @SuppressWarnings("unused")
    List<Todo> findByUserName(String userName);
}