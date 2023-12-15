import express from 'express';
import OptionController from '../controllers/options.controller.js';

//Initialize Express router.
const optionRouter = express.Router();

const optionController = new OptionController(); 

//All the paths to controller methods.
optionRouter.post('/:id/create', optionController.createOptions);
optionRouter.get('/:id/add_vote', optionController.addVote);
optionRouter.delete('/:id/delete', optionController.deleteOptions);

export default optionRouter;
