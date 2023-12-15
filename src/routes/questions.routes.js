import express from 'express';
import QuestionController from '../controllers/questions.controller.js';

//Initialize Express router.
const questionRouter = express.Router();

const questionController = new QuestionController(); 

//All the paths to controller methods.
questionRouter.post('/create', questionController.createQuestion);
questionRouter.get('/:id', questionController.getQuestion);
questionRouter.delete('/:id/delete', questionController.deleteQuestion);

export default questionRouter;
