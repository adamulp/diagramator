const express = require('express');
const path = require('path');

const app = express();
const port = 8761;

// Set PUG as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Set up static folder for icons and styles
app.use(express.static(path.join(__dirname, 'public')));

// Route to render main diagram page
app.get('/', (req, res) => {
    res.render('index', { title: 'ER Diagram Tool' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
