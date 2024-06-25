
import {Router} from 'express';
import {getTodos,createTodo,deleteTodo,updateTodo} from '../controllers/todo.controller.js';
const router=Router();


router.route('/').get(getTodos)
router.route('/delete/:id').delete(deleteTodo)
router.route('/save').post(createTodo)
router.route('/update').put(updateTodo)
export default router;