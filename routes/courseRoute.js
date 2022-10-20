import express from 'express';
import { createCourse, deleteCourse, enrollCourse, getAllCourses, getCourse, releaseCourse, updateCourse } from '../controllers/courseController.js';
import roleMiddeware from '../middlewares/roleMiddeware.js';

const router = express.Router();

router.route('/').post(roleMiddeware,createCourse);
router.route('/').get(getAllCourses);
router.route('/:slug').get(getCourse);
router.route('/:slug').delete(deleteCourse);
router.route('/:slug').put(updateCourse);
router.route('/enroll').post(enrollCourse);
router.route('/release').post(releaseCourse);

export default router;