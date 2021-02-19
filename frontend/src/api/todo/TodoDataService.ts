import todoApi from '../../components/todo/ApiService';
import { Todo } from '../../components/todo/Domain'


class TodoDataService {
  retrieveAllTodos(user: string) {
    return todoApi.get(`/users/${user}/todos`);
  }

  retrieveTodo(user: string, id: number) {
    return todoApi.get(`/users/${user}/todos/${id}`);
  }

  deleteTodo(user: string, id: number) {
    return todoApi.delete(`/users/${user}/todos/${id}`);
  }

  updateTodo(user: string, id: number, todo: Todo) {
    return todoApi.put(`/users/${user}/todos/${id}`, todo);
  }

  createTodo(user: string, todo: Todo) {
    return todoApi.post(`/users/${user}/todos`, todo);
  }

  isAlive() {
    return todoApi.get("/actuator/health")
  }
}

export default new TodoDataService();
