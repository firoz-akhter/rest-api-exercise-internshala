const express = require('express');
const app = express();

const users = [
    {
        id: 1,
        firstName: "Firoz",
        lastName: "Akhter",
        hobby: "Coding"
    },
    {
        id: 2,
        firstName: "Honey",
        lastName: "Singh",
        hobby: "being nice"
    },
    {
        id: 3,
        firstName: "Vikas",
        lastName: "Yadav",
        hobby: "Watching anime"
    },
    {
        id: 4,
        firstName: "Pradeep",
        lastName: "Jenna",
        hobby: "writing shayari"
    }
]

function validationIncoming(req, res, next) {
    console.log("doing validation");
    const { firstName, lastName, hobby } = req.body;
    if (!firstName || !lastName || !hobby) {
        return res.status(400).json({ error: "Some of the required field is missing..." });
    }
    next();
}

// Middleware
app.use(express.json()); 

app.use((req, res, next) => {
    // console.log(req.statusCode);
    console.log("method-->", req.method)
    console.log("Url-->", req.url);
    console.log("Status Code-->", req.statusCode);
    next();
});


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my Express App!');
});

app.get("/users", (req, res) => {
    res.status(200).send(users)
    // res.send("Fetching users data...");
})


app.get("/users/:id", (req, res) => {
    // res.send("Fetching specific user data");
    let id = req.params.id;
    let user;
    for(let i=0; i<users.length; i++) {
        if(id == users[i].id) {
            user = users[i];
        }
    }
    if(!user) {
        res.status(404).send("User not found...")
    }
    res.status(200).send(user);
})

app.post("/user", validationIncoming, (req, res) => {
    // we will save the user
    // res.send("User saved successfully...")
    let {firstName, lastName, hobby} = req.body;
    let id = Date.now();
    let newUser = {id, firstName, lastName, hobby};
    users.push(newUser)
    res.status(201).send(newUser)
})

app.put("/user/:id", validationIncoming, (req, res) => {
    // we will update the specific user data
    // res.send("User updated successfully...")
    let id = req.params.id;

    let {firstName, lastName, hobby} = req.body;

    for(let i=0; i<users.length; i++) {
        if(id == users[i].id) {
            users[i].firstName = firstName;
            users[i].lastName = lastName;
            users[i].hobby = hobby;

            // console.log("Inside for loop if")
            res.status(200).send(users[i])
            return;
        }
    }

    res.status(404).send("User not found...")


})

app.delete("/user/:id", (req, res) => {
    // delete the user with given id
    // res.send("user deleted successfully...");
    let id = req.params.id;
    let index = -1;

    for(let i=0; i<users.length; i++) {
        if(id == users[i].id) {
            index = i;
        }
    }
    if(index == -1) {
        res.status(404).send("User not found to delete...");
        return ;
    }

    users.splice(index, 1);
    res.status(200).send("User deleted successfully...");

})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
