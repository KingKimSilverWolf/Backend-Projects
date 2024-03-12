import express from 'express';
import userRoutes from './routes/users.js'

const app = express();
const PORT = 8000; // Listen on port 8000

// Use Express's built-in middleware to parse JSON request bodies
app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    console.log('[GET ROUTE]'); // Logs on the terminal that the request has been received
    res.send('Hello World'); // Send the response to the client
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
