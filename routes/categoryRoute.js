import express from 'express'
import { deleteCategory } from '../controllers/authController.js';
import { createCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.route('/').post(createCategory);
router.route("/:id").delete(deleteCategory);

export default router;