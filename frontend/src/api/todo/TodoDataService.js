import todoApi from '../../components/todo/ApiService';


class TodoDataService {
  retrieveAllTodos(user) {
    return todoApi.get(`/users/${user}/todos`);
  }

  retrieveTodo(user, id) {
    return todoApi.get(`/users/${user}/todos/${id}`);
  }

  deleteTodo(user, id) {
    return todoApi.delete(`/users/${user}/todos/${id}`);
  }

  updateTodo(user, id, todo) {
    return todoApi.put(`/users/${user}/todos/${id}`, todo);
  }

  createTodo(user, todo) {
    return todoApi.post(`/users/${user}/todos`, todo);
  }

  isAlive() {
    return todoApi.get("/actuator/health")
  }
}

export default new TodoDataService();
