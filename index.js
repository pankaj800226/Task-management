import express from 'express';
import { taskModel } from './models/task.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT || 8000
const app = express();

app.use(cors());
app.use(express.json());


try {
  // mongoose.connect('mongodb://127.0.0.1:27017/taskManager')
  mongoose.connect(process.env.MONGODB_URL)

} catch (error) {
  console.log(error);
}

app.post('/create', async (req, res) => {
  const { tital, date } = req.body;
  try {
    const task = await taskModel.create({
      tital: tital,
      date: date
    })

    if (!task) {
      return res.status(404).json({ message: "task not created" })
    }

    res.json(task)
  } catch (error) {
    console.log(error);
  }
})

app.post('/showTask', async (req, res) => {
  try {
    const tasks = await taskModel.find();
    if (!tasks) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleteTask = await taskModel.findByIdAndDelete(id)
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(deleteTask);
  } catch (error) {
    console.log(error);
  }
})

app.put('/edit/:id', async (req, res) => {
  const { id } = req.params
  const { tital, date } = req.body;

  try {
    const editTask = await taskModel.findByIdAndUpdate(id, {
      tital: tital,
      date: date
    })
    if (!editTask) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json(editTask)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });

  }
})

app.post('/getTask/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });

    }
    res.json(task);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });

  }

})

app.put('/doneTask/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(id, { done: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});








app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
})