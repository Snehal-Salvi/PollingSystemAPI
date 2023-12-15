import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }]

}, { timestamps: true });


const QuestionModel = mongoose.model('Question', questionSchema);
export default  QuestionModel;