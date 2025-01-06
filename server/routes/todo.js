import express from 'express';
import { addTodo, deleteTodo, listTodos} from "../controllers/todo.js"
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', auth, addTodo);
router.delete('/', auth, deleteTodo);
router.get('/', auth, listTodos);

export default router;
