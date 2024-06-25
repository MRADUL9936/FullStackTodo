
import './App.css'

import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { useSelector } from 'react-redux'
import { fetchTodo } from './features/todo/todoSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
function App() {
  const dispatch = useDispatch();
  const status = useSelector(store => store.todos.status);
  const error = useSelector(store => store.todos.error);

  const todos = useSelector(store => store.todos.todos); 
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch,todos.length]);



  return (

    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
      <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
      <div className="mb-4">
        <TodoForm />
      </div>
      { status== 'loading' ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div key={todo._id} className='w-full'>
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-full">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  </div>
);
}

export default App
