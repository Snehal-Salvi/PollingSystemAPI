import QuestionModel from "../models/questions.schema.js";
import OptionModel from "../models/options.schema.js";

export default class OptionController {

    // Method to create options for a specific question
    async createOptions(req, res) {
        try {
            // Extracting questionId and option text from the request
            const questionId = req.params.id;
            const { text } = req.body;
    
            // Return a 404 status if questionId or option text is empty
            if (!questionId || !text) {
                return res.status(404).json({
                    message: 'Empty Question id or option text',
                    status: 'failure',
                    data: []
                });
            }
    
            // Find the question by its ID
            const question = await QuestionModel.findById(questionId);
    
            // Return a 404 status if the question with the given ID is not found
            if (!question) {
                return res.status(404).json({
                    message: 'Invalid Question id',
                    status: 'failure',
                    data: []
                });
            }
    
            // Base URL for creating links
            const baseUrl = `http://localhost:8000`
    
            // Create a new option and set its link_to_vote property
            const option = await OptionModel.create({ 'text': text, 'question_id': question._id });
            option.link_to_vote = `${baseUrl}/api/options/${option.id}/add_vote`;
            await option.save();
    
            // Throw an error if unable to create the option
            if (!option) {
                throw new Error('Unable to create option');
            }
    
            // Update the question's options array
            question.options.push(option._id);
            await question.save()
    
            // Return a 200 status with the created option
            return res.status(200).json({
                message: 'Option created',
                status: 'successful',
                data: [option]
            });
    
        } catch (error) {
            // Log and return a 500 status in case of an error
            console.log('CREATE OPTION ERROR: ', error);
    
            return res.status(500).json({
                message: 'Internal Server Error',
                status: 'failure',
                data: []
            })
        }
    }

    // Method to delete an option by its ID
    async deleteOptions(req, res) {
        try {
            // Extracting optionId from the request parameters
            const optionId = req.params.id;
    
            // Return a 404 status if the optionId is empty
            if (!optionId) {
                return res.status(404).json({
                    message: 'Empty option id received',
                    status: 'failure',
                    data: []
                });
            };
    
            // Find the option by its ID
            const option = await OptionModel.findById(optionId);
    
            // Return a 404 status if the option with the given ID is not found
            if (!option) {
                return res.status(404).json({
                    message: 'Invalid option id received',
                    status: 'failure',
                    data: []
                });
            };
    
            // Update the associated question's options array and delete the option
            await QuestionModel.findByIdAndUpdate(option.question_id, { $pull: { 'options': option.id } });
            await OptionModel.findByIdAndDelete(optionId);
    
            // Return a 200 status indicating successful deletion
            return res.status(200).json({
                message: 'Option deleted',
                status: 'successful',
                data: []
            });
    
        } catch (error) {
            // Log and return a 500 status in case of an error
            console.log('DELETE OPTION ERROR: ', error);
    
            return res.status(500).json({
                message: 'Internal Server Error',
                status: 'failure',
                data: []
            })
        }
    }

    // Method to increment the vote count for an option
    async addVote(req, res) {
        try {
            // Extracting optionId from the request parameters
            const optionId = req.params.id;
    
            // Return a 404 status if the optionId is empty
            if (!optionId) {
                return res.status(404).json({
                    message: 'Empty option id received',
                    status: 'failure',
                    data: []
                });
            };
    
            // Find the option by its ID
            const option = await OptionModel.findById(optionId);
    
            // Return a 404 status if the option with the given ID is not found
            if (!option) {
                return res.status(404).json({
                    message: 'Invalid option id received',
                    status: 'failure',
                    data: []
                });
            };
    
            // Increment the vote count for the option and save the changes
            option.votes++;
            await option.save();
    
            // Return a 200 status with the updated option
            return res.status(200).json({
                message: 'Vote incremented',
                status: 'successful',
                data: [option]
            })
    
        } catch (error) {
            // Log and return a 500 status in case of an error
            console.log('ADD VOTE TO OPTION ERROR: ', error);
    
            return res.status(500).json({
                message: 'Internal Server Error',
                status: 'failure',
                data: []
            })
        }
    }
}
