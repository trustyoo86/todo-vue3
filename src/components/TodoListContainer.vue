<template></template>

<script lang="ts">
  import { ref, readonly, provide } from 'vue';
import { TTodoItem } from '../entities/todo';

  export default {
    name: 'TodoListContainer',
    setup() {
      const todos = ref<TTodoItem[]>([]);

      provide('todos', readonly(todos));

      const initTodos = (init_todos: []) => {
        todos.value = init_todos;
      };

      const addTodo = (todo, date) => {};
      const removeTodo = (id: number) => {};
      const completeTodo = (id: number) => {};

      provide('addTodo', addTodo);
      provide('removeTodo', removeTodo);
      provide('completeTodo', completeTodo);
    }
  };
</script>
