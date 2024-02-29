const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); 

app.set('view engine', 'ejs'); 


let tasks = [];


app.get('/', (req, res) => {
    res.render('index', { tasks });
});


app.post('/addTask', (req, res) => {
    const task = req.body.task;
    tasks.push({ name: task, completed: false });
    res.redirect('/');
});


app.post('/completeTask', (req, res) => {
    const index = req.body.index;
    tasks[index].completed = true;
    res.redirect('/');
});


// Route to handle deleting a task
app.post('/deleteTask', (req, res) => {
    const index = req.body.index;
    tasks.splice(index, 1);
    res.sendStatus(200); // Send a success response
});

// Route to handle updating a task name
app.post('/updateTask', (req, res) => {
    const index = req.body.index;
    const newName = req.body.newName;
    tasks[index].name = newName;
    res.sendStatus(200); // Send a success response
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
