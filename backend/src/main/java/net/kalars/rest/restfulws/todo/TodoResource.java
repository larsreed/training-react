package net.kalars.rest.restfulws.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoResource {

    @Autowired
    private TodoService todoService;

    @GetMapping("/users/{userName}/todos")
    public List<Todo> getAllTodos(final @PathVariable String userName) {
        return todoService.getAllTodos(userName);
    }

    @GetMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Todo> getTodo(final @PathVariable String userName, final @PathVariable long id) {
        final Todo todo = todoService.getTodo(userName, id);
        if (todo==null) return  ResponseEntity.notFound().build();
        return ResponseEntity.ok(todo);
    }

    @PostMapping("/users/{userName}/todos")
    public ResponseEntity<Void> createTodo(final @PathVariable String userName, @RequestBody Todo todo) {
        if (!todo.getUserName().equals(userName)) return ResponseEntity.badRequest().build();
        final Todo res = todoService.upsertTodo(todo);
        if (res==null) return  ResponseEntity.badRequest().build();
        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(res.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(final @PathVariable String userName, final @PathVariable long id, @RequestBody Todo todo) {
        if (!todo.getUserName().equals(userName)) return ResponseEntity.badRequest().build();
        if (todo.getId() != id) return ResponseEntity.badRequest().build();
        final Todo res = todoService.upsertTodo(todo);
        if (res==null) return  ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/users/{userName}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(final @PathVariable String userName, final @PathVariable long id) {
        if (todoService.deleteTodo(userName, id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}