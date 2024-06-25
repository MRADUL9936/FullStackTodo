import { useDispatch } from "react-redux";
import { updateTodoAsync,removeTodoAsync } from "../features/todo/todoSlice";
import { useState } from "react";

function TodoItem({ todo }) {
    console.log(todo)
    const [todoMsg,setTodoMsg]=useState(todo.content)
    const[isTodoEditable,setIsTodoEditable]=useState(false)
const dispatch=useDispatch()

const toggleCompleted=()=>{
    dispatch(updateTodoAsync({_id:todo._id,content:todo.content,status:!todo.status,editable:todo.editable}))
}

const editTodo=()=>{
    dispatch(updateTodoAsync({_id:todo._id,content:todoMsg,status:todo.status,editable:!todo.editable}))
}

const removeTodo=(id)=>{
    console.log(id)
     dispatch(removeTodoAsync(id))
}
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.status}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.status ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.status) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.status}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={()=>removeTodo(todo._id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
