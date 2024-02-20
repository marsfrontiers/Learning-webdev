const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set up view engine (assuming you're using EJS)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Mock data for demonstration
let posts = [
    { id: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2' }
];

// Define routes
app.get('/', (req, res) => {
  res.render("index.ejs", { posts });
});

app.get('/create', (req, res) => {
  res.render('create.ejs');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    // Generate unique ID for the new post
    const id = posts.length + 1;
    // Create new post object
    const newPost = { id, title, content };
    // Add new post to the posts array
    posts.push(newPost);
    // Redirect to homepage
    res.redirect('/');
});

app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const postToUpdate = posts.find(post => post.id === parseInt(id));
    res.render('update.ejs', { post: postToUpdate });
});

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const postIndex = posts.findIndex(post => post.id === parseInt(id));
    // Update post with new data
    posts[postIndex] = { ...posts[postIndex], title, content };
    // Redirect to homepage
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    // Filter out the post to delete
    posts = posts.filter(post => post.id !== parseInt(id));
    // Redirect to homepage
    res.redirect('/');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
