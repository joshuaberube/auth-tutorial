import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
    try {
        const db = req.app.get("db")

        const { email, password } = req.body
    
        const [checkUser] = await db.check_user([email])
        if (checkUser) return res.status(400).send("Email already in use.")
    
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        // const hashedPass = await bcrypt.hash(password, 10)
        req.body.password = hash
    
        const [newUser] = await db.create_user(req.body)
    
        req.session.user = newUser
    
        res.status(200).send(req.session.user)
    } catch (err) {
        console.log(err)
        return res.status(500).send("Database Error on registerUser function")
    }
}

const loginUser = async (req, res) => {
    try {
        const db = req.app.get("db")

        const { email, password } = req.body
    
        const [checkUser] = await db.check_user([email])
        if (!checkUser) return res.status(400).send("Email or password incorrect.")

        const auth = bcrypt.compareSync(password, checkUser.password)
        //const auth = await bcrypt.compare(passowrd, checkUser.password)

        if (auth) {
            delete checkUser.password
            req.session.user = checkUser

            return res.status(200).send(req.session.user)
        } else {
            return res.status(400).send("Email or password incorrect.")
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send("Database Error on loginUser function")
    }
}

const logoutUser = (req, res) => {
    req.session.destroy()
    return res.sendStatus(200)
}

const getUserSession = async (req, res) => {
    const db = req.app.get("db")
    const { user_id } = req.session.user

    const [currentUser] = await db.get_user_session([user_id])

    return currentUser ? res.status(200).send(req.session.user)
    : res.status(404).send("Login again please")
}

export { registerUser, loginUser, logoutUser, getUserSession }