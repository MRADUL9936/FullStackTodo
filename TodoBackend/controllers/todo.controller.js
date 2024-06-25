
import {Todo} from "../models/todo.model.js"

const createTodo = async (req, res) => {   
    
    try{
        const {content}=req.body;
        const todo = new Todo({
           content:content,
              status:false,
                editable:false
        })
        const createdTodo = await todo.save()
        res.status(201).json(createdTodo)

    }catch(err){
        console.log("Error creating todo",err.message)
        res.status(500).json({message:"Server Error"})
    }

}

const getTodos = async (req, res) => {
    try{
        const todos = await Todo.find({})
        res.status(200).json(todos)
    }catch(err){
        console.log("Error getting todos",err.message)
        res.status(500).json({message:"Server Error"})
    }
   

}


const deleteTodo = async (req, res) => {
    try{
        const id=req.params.id
    
          // Validate the ObjectId
    

        const todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).json({message:"Todo not found"})
        }
        await todo.deleteOne({_id: id});
        res.status(200).json({message:"Todo deleted successfully"})
    
    }catch(err){
        console.log("Error deleting todo",err.message)
        res.status(500).json({message:"Server Error"})
    }
}   

const updateTodo = async (req, res) => {
   try{
         const {_id,content,status,editable}=req.body;
         console.log(req.body)
         const todo = await Todo.findById(_id)
            if(!todo){
                return res.status(404).json({message:"Todo not found"})
            }
            todo.content=content;
            todo.status=status;
            todo.editable=editable;
            const updatedTodo = await todo.save()
            res.status(200).json(updatedTodo)

   }catch(err){
         console.log("Error updating todo",err.message)
         res.status(500).json({message:"Server Error"})
   }

}




export {createTodo,getTodos,deleteTodo,updateTodo}