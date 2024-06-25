import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const todosConst = Object.freeze({
    loading: 'loading',
    completed: 'completed',
    rejected: 'rejected'
});

const initialState = {
    todos: [],
     status: todosConst.loading,
    error: ''
};

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async () => {
    const response = await fetch('http://localhost:5000/todos/');
    const data = await response.json();
    
    return data;
});

export const addTodoAsync = createAsyncThunk('todo/addTodoAsync', async (todoText) => {
    const response = await fetch('http://localhost:5000/todos/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: todoText })
    });
       
    const data = await response.json();
 
    return data;
});

export const removeTodoAsync = createAsyncThunk('todo/removeTodoAsync', async (todoId) => {
    const response = await fetch(`http://localhost:5000/todos/delete/${todoId}`, {
        method: 'DELETE'
    }); 
    const data = await response.json();
    return data;
});

export const updateTodoAsync = createAsyncThunk('todo/updateTodoAsync', async (todo) => {
    console.log(todo)
    const response = await fetch(`http://localhost:5000/todos/update/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo),
    });
            const data=await response.json();

            return data;
});

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // reducers: {
    //     addTodo: (state, action) => {
    //         // const todo = {   
    //         //     text: action.payload, 
    //         // };
    //         // state.todos.push(todo);
    //     },
    //     removeTodo: (state, action) => {
    //         state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    //     },
    //     updateTodo: (state, action) => {
    //         const { id, text } = action.payload;
    //         const existingTodo = state.todos.find((todo) => todo.id === id);
    //         if (existingTodo) {
    //             existingTodo.text = text;
    //         }
    //     },
    //     completedTodo: (state, action) => {
    //         const { id, completed } = action.payload;
    //         const existingTodo = state.todos.find((todo) => todo.id === id);
    //         if (existingTodo) {
    //             existingTodo.completed = completed;
    //         }
    //     }
    // },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.status = todosConst.loading;
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.status = todosConst.completed;
                state.todos = action.payload;
               
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.status= todosConst.rejected;
                state.error = action.error.message;
            });
    
        builder
        .addCase(addTodoAsync.pending, (state) => {
            state.status = todosConst.loading;
        })
        .addCase(addTodoAsync.fulfilled, (state, action) => {
            state.status = todosConst.loading;
            state.todos.push(action.payload);
          
        })
        .addCase(addTodoAsync.rejected, (state, action) => {
            state.status= todosConst.rejected;
            state.error = action.error.message;
        });

        builder
        .addCase(removeTodoAsync.pending, (state) => {
            state.status = todosConst.loading;
        })
        .addCase(removeTodoAsync.fulfilled,(state, action) => {
            state.status = todosConst.completed;
            state.todos = state.todos.filter((todo) => todo._id === action.payload);
        })
        .addCase(removeTodoAsync.rejected, (state, action) => {
            state.status= todosConst.rejected;
            state.error = action.error.message;
        });

    builder
          .addCase(updateTodoAsync.pending, (state) => {
            state.status = todosConst.loading;  
          })
          .addCase(updateTodoAsync.fulfilled, (state, action) => {  
            state.status = todosConst.completed;
            const { _id, content,status,editable } = action.payload;
            const existingTodo = state.todos.find((todo) => todo._id === _id);
            if (existingTodo) {
                existingTodo.content = content;
                existingTodo.status = status;
                existingTodo.editable = editable;
            }
          })
          .addCase(updateTodoAsync.rejected, (state, action) => {
            state.status= todosConst.rejected;
            state.error = action.error.message;
          });
    }
});

// export const { addTodo, removeTodo, updateTodo, completedTodo } = todoSlice.actions;

export default todoSlice.reducer;
