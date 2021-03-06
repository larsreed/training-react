package net.kalars.rest.restfulws.todo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@SuppressWarnings("unused")
@Entity
public class Todo implements Comparable<Todo> {

    @Id
    @GeneratedValue
    private Long id;
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

    public Todo(final Todo todo) {
        this(todo.getId(), todo.userName, todo.description, todo.dueDate, todo.done);
    }


    public Long getId() {
        return this.id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(final Date dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isDone() {
        return this.done;
    }

    public void setDone(final boolean done) {
        this.done = done;
    }

    @SuppressWarnings({"CompareToUsesNonFinalVariable", "MethodWithMoreThanThreeNegations"})
    @Override
    public int compareTo(final Todo that) {
        if (!this.done && that.done) return -1;
        if (this.done && !that.done) return +1;
        if (this.dueDate!=null && that.dueDate==null) return -1;
        if (this.dueDate==null && that.dueDate!=null) return +1;
        if (this.dueDate != null && !this.dueDate.equals(that.dueDate)) return this.dueDate.compareTo(that.dueDate);
        return this.description.compareTo(that.description);
    }

    @Override
    public boolean equals(final Object that) {
        if (!(that instanceof Todo)) return false;
        return compareTo((Todo) that) == 0;
    }
}