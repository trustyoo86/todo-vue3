import { reactive, Ref, toRefs } from 'vue';
import { TTodoItem } from '../entities/todo';

type TInitTodos = (temp_todos: TTodoItem[]) => void;

export const useStorage = () => {
  const KEY = 'my-todo-list';
  const storage_obj = reactive({ storage_id: 0 });
  const loadTodos = (initTodos: TInitTodos) => {
    let temp_todos = JSON.parse(localStorage.getItem(KEY) || '[]');
    temp_todos.forEach((todo: TTodoItem, idx: number) => {
      todo.id = idx;
    });
    storage_obj.storage_id = temp_todos.length;
    initTodos(temp_todos);
  };

  const saveTodos = (todos: Ref<TTodoItem[]>) => {
    localStorage.setItem(KEY, JSON.stringify(todos.value));
  };

  return {
    ...toRefs(storage_obj),
    loadTodos,
    saveTodos,
  };
};
