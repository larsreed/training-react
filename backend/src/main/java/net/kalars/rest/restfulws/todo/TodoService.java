package net.kalars.rest.restfulws.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private static final List<Todo> todos = new ArrayList<>();
    private static long ids = 0;

    static {
        todos.add(new Todo(++ids, "foo", "Eat", new Date(), false));
        todos.add(new Todo(++ids, "foo", "Read a book", new Date(), false));
        todos.add(new Todo(++ids, "foo", "Travel abroad", new Date(), true));
        todos.add(new Todo(++ids, "foo", "Sleep", new Date(), false));
    }

    public List<Todo> getAllTodos(final String userName) {
        return todos.stream().sorted().filter(todo -> todo.getUserName().equals(userName)).collect(Collectors.toList());
    }

    public boolean deleteTodo(final String userName, final long id) {
        return todos.removeIf(todo -> todo.getId() == id && todo.getUserName().equals(userName));
    }

    public Todo getTodo(final String userName, final long id) {
        return todos.stream().filter(todo -> todo.getId() == id && todo.getUserName().equals(userName)).findFirst().orElse(null);
    }

    public Todo upsertTodo(final Todo todo) {
        if (todo.getId()<1) return insertTodo(++ids, todo);
        deleteTodo(todo.getUserName(), todo.getId());
        return insertTodo(todo.getId(), todo);
    }

    private Todo insertTodo(final long id, final Todo old) {
        final Todo todo = new Todo(old);
        todo.setId(id);
        todos.add(todo);
        return todo;
    }
}