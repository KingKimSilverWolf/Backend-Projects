import express from 'express';
import { v4 as uuidv4 } from 'uuid'; // So i know im generating a version 4 UUID

const router = express.Router();

// Mock database
let users = [  // Make it mutable for when we want to delete users
  {
    first_name: 'Kim',
    last_name: 'Maguns',
    email: 'KimMaguns@test.com',
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@test.com',
  },
  {
    first_name: 'Kieth',
    last_name: 'White',
    email: 'KiethWhite@test.com',
  },
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    console.log("User List")
    res.send(users);
})

// Post a new user 
router.post('/', (req, res) => {
    console.log("User created")
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
}) 

// Get a specific user
router.get('/:id', (req, res) => {
    console.log("Get user")
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
});

// Delete user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    // Find the user before deleting
    const userToDelete = users.find(user => user.id === id);

    if (userToDelete) {
        // Remove the user from the array
        users = users.filter((user) => user.id !== id);
        
        // Send back a message with the user's name
        res.send(`${userToDelete.first_name} ${userToDelete.last_name} has been deleted successfully from the database.`);
        console.log("User deleted");
    } else {
        // If no user is found with the given ID, send a different response
        res.status(404).send(`User not found with ID: ${id}`);
    }
});

// Update the information of a user
router.patch('/:id', (req, res) => {
    console.log("Updated user information");
    const { id } = req.params;
  
    const { first_name, last_name, email } = req.body;
  
    // Find the user by ID
    const user = users.find((user) => user.id === id);
  
    // Store old values for the response
    const oldDetails = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    };
  
    // Update user information if provided
    if(first_name) user.first_name = first_name;
    if(last_name) user.last_name = last_name;
    if(email) user.email = email;

    // Construct the update message
    let updateMessage = `${oldDetails.first_name} ${oldDetails.last_name}'s information has been updated to: `;

    // Add updated fields to the message
    updateMessage += `First Name: ${user.first_name}, `;
    updateMessage += `Last Name: ${user.last_name}, `;
    updateMessage += `Email: ${user.email}.`;

    res.send(updateMessage);
});


export default router