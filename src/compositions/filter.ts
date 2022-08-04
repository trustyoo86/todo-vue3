import { inject } from 'vue';
import { TTodoItem } from '../entities/todo';

export type TTodos = { value: TTodoItem[] };

export const useFilter = () => {
  const today = inject<string>('today');

  const fnSort = (a: TTodoItem, b: TTodoItem) => {
    const a_date = Date.parse(a.date);
    const b_date = Date.parse(b.date);

    if (a_date > b_date) {
      return 1;
    } else if (a_date < b_date) {
      return 0;
    } else {
      return (a.id as number) - (b.id as number);
    }
  };

  const getPendingTodos = (todos: TTodos) => {
    return todos.value.filter((todo) => todo.date < (today as string) && !todo.completed).slice().sort(fnSort);
  };

  const getActiveTodayTodos = (todos: TTodos) => {
    return todos.value
      .filter((todo) => todo.date == today && !todo.completed)
      .slice()
      .sort(fnSort);
  };

  const getCompletedTodayTodos = (todos: TTodos) => {
    return todos.value
      .filter((todo) => todo.date == today && todo.completed)
      .slice()
      .sort(fnSort);
  };

  const getAllTodayTodos = (todos: TTodos) => {
    return getActiveTodayTodos(todos)
      .concat(getCompletedTodayTodos(todos))
      .slice()
      .sort(fnSort);
  };

  const getAllTodos = (todos: TTodos) => {
    return todos.value.slice().sort(fnSort);
  };

  return {
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  };
};
