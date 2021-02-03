import dotenv from "dotenv"
import express from "express"
import massive from "massive"
import session from "express-session"
import { registerUser, loginUser, logoutUser, getUserSession } from "./controllers/authController.js"
import { checkSession } from "./middleware.js"
const app = express()
dotenv.config()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive({connectionString: CONNECTION_STRING, ssl: {rejectUnauthorized: false}})
.then(db => {app.set("db", db); console.log("Connected to database!")})
.catch(err => console.log(err))

//# Auth Endpoints
app.post("/api/user/register", registerUser)
app.post("/api/user/login", loginUser)
app.post("/api/user/logout", checkSession, logoutUser)
app.post("/api/user/session", checkSession, getUserSession)

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}.`))