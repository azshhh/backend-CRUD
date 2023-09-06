const mongoose = require('mongoose');

// Connecting our application to MongoDb server
mongoose.connect('mongodb://localhost/crud-operation')
    .then(() => console.log('Connecting to MongoDB...'))
    .catch(error => console.error('MongoDb connection failed.', error));

// Creating a Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

// CREATE OPERATION
// Creating Model that compiles schema to document
const Course = mongoose.model('Course', courseSchema);
// Creating object for that Model
async function createCourse() {
    const course = new Course({
        name: 'Django Course',
        author: 'Mercedes',
        tags: ['python', 'backend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}


// READ OPERATION
// We create an object 'courses' for a collection 'Course' in mongodb server
async function getCourses(id) {
    const courses = await Course
        .find({ author: 'Redbull', isPublished: true })
        .limit(2)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, isPublished: 1 });
    console.log(courses);
}

// UPDATE OPERATION : Approach - Query First
// We find a course by id, if not exists - return, else set keys to be updated.
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    course.set({
        author: 'Ferrari',
        isPublished: false
    });

    const result = await course.save();
    console.log(result);
}

updateCourse('64f8a7a30d8ce220247feeda');