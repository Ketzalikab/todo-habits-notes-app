const express = require('express');
const mongoose = require('mongoose');

const app = express ();

app. use(express.json());

//configuracion basica con MongoDB

mongoose.connect('mongodb://localhost:27017/todo-app')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true 
    },
    completed: {
        type: Boolean,
        default: false
    },
});

const Task = mongoose.model('Task', taskSchema);

app.get('/', (req, res) => {
    res.send('API is running');
});


//Rutas CRUD

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task){
            return res.status(404).send();
        }
        res.send(task);

    } catch (error) {
        res.status(500).send(error);
    }
});


app.listen(5000, () => {
    console.log('Server is running on port 500');
});