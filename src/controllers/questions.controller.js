import QuestionModel from "../models/questions.schema.js";
import OptionModel from "../models/options.schema.js";

export default class QuestionController {

    // Method to create a new question
    async createQuestion(req, res) {
        try {
          
            const { title } = req.body;

            // Check if the question with the same title already exists
            const existingQuestion = await QuestionModel.findOne({ 'title': title });
    
            if (existingQuestion) {
                // Return a 401 status if the question already exists
                return res.status(401).json({
                    message: 'Question is already exist',
                    status: 'failure',
                    data: [{ id: existingQuestion._id }]
                });
            };
    
            // Create a new question
            const question = await QuestionModel.create({ 'title': title });
    
            // Return a 200 status with the created question
            return res.status(200).json({
                message: 'Question created',
                status: 'successful',
                data: [question]
            });
    
        } catch (error) {
            // Log and return a 500 status in case of an error
            console.log('Error while creating the question: ', error);
            return res.status(500).json({
                message: 'Internal server error',
                status: 'failure',
                data: []
            });
        }
    }

    // Method to get a question by its ID
    async getQuestion(req, res) {
        try {
            // Extracting questionId from the request parameters
            const questionId = req.params.id; 

            // Return a 404 status if the questionId is empty
            if (!questionId) {
                return res.status(404).json({
                    message: 'Empty Question id',
                    status: 'failure',
                    data: []
                });
            };
    
            // Find the question by its ID
            const question = await QuestionModel.findById(questionId);
    
            // Return a 404 status if the question with the given ID is not found
            if (!question) {
                return res.status(404).json({
                    message: 'Invalid Question id',
                    status: 'failure',
                    data: []
                });
            };
    
            // Populate the options associated with the question
            await question.populate({ path: 'options', select: '-question_id' });
    
            // Return a 200 status with the fetched question
            return res.status(200).json({
                message: 'Question fetched',
                status: 'successful',
                data: [question]
            })
    
        } catch (error) {
            // Log and return a 500 status in case of an error
            console.log("Error while getting the question: ", error);
            return res.status(500).json({
                message: 'Internal server error',
                status: 'failure',
                data: []
            });
        }
    }

    // Method to delete a question by its ID
    async deleteQuestion(req, res) {
        try {
            
            const questionId = req.params.id;
    
            // Return a 404 status if the questionId is empty
            if (!questionId) {
                return res.status(404).json({
                    message: 'Empty Question id',
                    status: 'failure',
                    data: []
                });
            };
    
            // Find the question by its ID
            const question = await QuestionModel.findById(questionId);
    
            // Return a 404 status if the question with the given ID is not found
            if (!question) {
                return res.status(404).json({
                    message: 'Invalid Question id',
                    status: 'failure',
                    data: []
                });
            };
    
            // Delete options associated with the question
            await OptionModel.deleteMany({ '_id': { $in: question.options } });
            
            // Delete the question
            await QuestionModel.findByIdAndDelete(questionId);
    
            // Return a 200 status indicating successful deletion
            return res.status(200).json({
                message: 'Question deleted',
                status: 'successful',
                data: []
            });
    
        } catch (error) {
            // Log and return a 500 status in case of an error
            console.log("Error while deleting the question: ", error);
            return res.status(500).json({
                message: 'Internal server error',
                status: 'failure',
                data: []
            });
        }
    }
}
