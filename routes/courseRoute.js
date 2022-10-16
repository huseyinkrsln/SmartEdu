import express from 'express';
import { createCourse, getAllCourses } from '../controllers/courseController.js';

const router = express.Router();

router.route('/').post(createCourse);
router.route('/').get(getAllCourses);

export default router;