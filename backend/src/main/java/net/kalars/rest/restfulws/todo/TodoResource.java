package net.kalars.rest.restfulws.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.util.Collections.emptyList;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoResource {

    @Autowired
    private TodoJpaRepository repository;

    @GetMapping("/users/{userName}/todos")
    public List<Todo> getAllTodos(final @PathVariable String userName) {
        if (userName == null) return emptyList();
        var res = repository.findByUserName(userName);
        Collections.sort(res);
        return res;
    }

    @GetMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Todo> getTodo(final @PathVariable String userName, final @PathVariable long id) {
        final Optional<Todo> todo = repository.findById(id);
        if (todo.isEmpty()) return ResponseEntity.notFound().build();
        if (todo.get().getUserName() == null || userName == null) return ResponseEntity.badRequest().build();
        if (!todo.get().getUserName().equals(userName)) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(todo.get());
    }

    @PostMapping("/users/{userName}/todos")
    public ResponseEntity<Void> createTodo(final @PathVariable String userName, @RequestBody Todo todo) {
        if (todo.getUserName() == null || userName == null) return ResponseEntity.badRequest().build();
        if (!todo.getUserName().equals(userName)) return ResponseEntity.badRequest().build();
        final Todo res = repository.save(todo);
        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(res.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(final @PathVariable String userName, final @PathVariable long id, @RequestBody Todo todo) {
        if (todo.getUserName() == null || userName == null) return ResponseEntity.badRequest().build();
        if (!todo.getUserName().equals(userName)) return ResponseEntity.badRequest().build();
        if (todo.getId() != id) return ResponseEntity.badRequest().build();
        final Todo res = repository.save(todo);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(final @PathVariable String userName, final @PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}