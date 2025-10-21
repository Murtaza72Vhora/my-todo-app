import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    filter: 'all',
    search: '',
};

const saveToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(),
                text: action.payload.text,
                completed: false,
                priority: action.payload.priority || 'Medium',
                dueDate: action.payload.dueDate || null,
            });
            saveToLocalStorage(state.todos);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) todo.completed = !todo.completed;
            saveToLocalStorage(state.todos);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            saveToLocalStorage(state.todos);
        },
        clearAll: (state) => {
            state.todos = [];
            saveToLocalStorage(state.todos);
        },
        editTodo: (state, action) => {
            const { id, text, priority, dueDate } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = text;
                todo.priority = priority;
                todo.dueDate = dueDate;
            }
            saveToLocalStorage(state.todos);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        deleteCompleted: (state) => {
            state.todos = state.todos.filter((todo) => !todo.completed);
            saveToLocalStorage(state.todos);
        },
        markAllCompleted: (state) => {
            state.todos.forEach((todo) => (todo.completed = true));
            saveToLocalStorage(state.todos);
        },
    },
});

export const {
    addTodo,
    toggleTodo,
    deleteTodo,
    clearAll,
    editTodo,
    setFilter,
    setSearch,
    deleteCompleted,
    markAllCompleted,
} = todosSlice.actions;

export default todosSlice.reducer;
