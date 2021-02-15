package net.kalars.rest.restfulws.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.util.Collections.emptyList;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoResource {

    private static final String NO_TODO_WITH_ID = "No Todo with id %d";
    private static final String USERNAME_MISSING = "Username missing";
    private static final String USERNAME_MISMATCH = "Username in Todo (%s) does not match username in URL (%s)";
    private static final String ID_MISMATCH = "Id in Todo (%d) does not match id in URL (%d)";

    @Autowired
    private TodoJpaRepository repository;

    @SuppressWarnings("FeatureEnvy")
    private void userNameValidation(@PathVariable final String userName, final Todo todo) {
        if (todo.getUserName() == null || userName == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, USERNAME_MISSING);
        if (!todo.getUserName().equals(userName))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format(USERNAME_MISMATCH, todo.getUserName(), userName));
    }

    @GetMapping("/users/{userName}/todos")
    public List<Todo> getAllTodos(final @PathVariable String userName) {
        if (userName == null) return emptyList();
        final var res = this.repository.findByUserName(userName);
        Collections.sort(res);
        return res;
    }

    @GetMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Todo> getTodo(final @PathVariable String userName, final @PathVariable long id) {
        final Optional<Todo> todo = this.repository.findById(id);
        if (todo.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format(NO_TODO_WITH_ID, id));
        userNameValidation(userName, todo.get());
        return ResponseEntity.ok(todo.get());
    }

    @PostMapping("/users/{userName}/todos")
    public ResponseEntity<Todo> createTodo(final @PathVariable String userName, @RequestBody final Todo todo) {
        userNameValidation(userName, todo);
        final Todo res = this.repository.save(todo);
        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(res.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(final @PathVariable String userName, final @PathVariable long id,
                                           final @RequestBody Todo todo) {
        userNameValidation(userName, todo);
        if (todo.getId() != id)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,  String.format(ID_MISMATCH, todo.getId(), id));
        final var res = this.repository.save(todo);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(final @PathVariable String userName, final @PathVariable long id) {
        this.repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}