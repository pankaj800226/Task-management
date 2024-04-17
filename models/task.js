import mongoose from 'mongoose'


const taskSchema = new mongoose.Schema({
    tital: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false, // Default value is false, indicating the task is not done initially
    }
}, { timestamps: true })

export const taskModel = mongoose.model('Task', taskSchema)

