package net.kalars.rest.restfulws.todo;

import java.util.Date;

public class Todo {

    private long id;
    private String userName;
    private String description;
    private Date dueDate;
    private boolean done;

    public Todo() {
        super();
    }

    public Todo(final long id, final String userName, final String description, final Date dueDate, final boolean done) {
        this();
        this.id = id;
        this.userName = userName;
        this.description = description;
        this.dueDate = dueDate;
        this.done = done;
    }

    public Todo(Todo todo) {
        this(todo.getId(), todo.userName, todo.description, todo.dueDate, todo.done);
    }


    public long getId() {
        return id;
    }

    public void setId(final long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(final Date dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(final boolean done) {
        this.done = done;
    }
}