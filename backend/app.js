const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://0.0.0.0:27017/student_registration', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' }
});

const Student = mongoose.model('Student', studentSchema);


const programSchema = new mongoose.Schema({
    programId: { type: String, required: true },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
  });
  
  const Program = mongoose.model('Program', programSchema);

  
  app.post('/register', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.body.studentId, { program: req.body.programId }, { new: true }).populate('program');
    res.json(student);
  });
  

  app.get('/students', async (req, res) => {
    const students = await Student.find().populate('program');
    res.json(students);
  });


  
  app.get('/students/:id', async (req, res) => {
    const student = await Student.findOne({ studentId: req.params.id }).populate('program');
    res.json(student);
  });


  
  app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  });


  
  app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('program');
    res.json(student);
  });
  

  app.delete('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.json(student);
  });

  


  app.get('/programs', async (req, res) => {
    const programs = await Program.find();
    res.json(programs);
  });
  

  app.get('/programs/:id', async (req, res) => {
    const program = await Program.findById(req.params.id);
    res.json(program);
  });

  
  app.post('/programs', async (req, res) => {
    const program = new Program(req.body);
    await program.save();
    res.json(program);
  });
  

  app.put('/programs/:id', async (req, res) => {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(program);
  });

  
  app.delete('/programs/:id', async (req, res) => {
    const program = await Program.findByIdAndDelete(req.params.id);
    res.json(program);
  });

  
  

  app.listen(3001, () => {
    console.log('Server started on port 3001...');
  });                                                


