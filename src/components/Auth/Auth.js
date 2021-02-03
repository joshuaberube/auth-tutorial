import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { changeIsLoggingIn, login } from "../../redux/userSlice"

const Auth = () => {
    const [authState, setAuthState] = useState({email: "", password: "", username: ""})
    const isLoggingIn = useSelector(state => state.user.isLoggingIn)
    const status = useSelector(state => state.user.status)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (status === "success") history.push("/")
    }, [history, status])

    const changeHandler = e => {
        setAuthState({...authState, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = e => {
        e.preventDefault()

        dispatch(login(authState))
    }

    const authInputs = [
        {label: "Username", type: "text", name: "username", placeholder: "JerryIsCool"},
        {label: "Email", type: "email", name: "email", placeholder: "yourname@domain.com"},
        {label: "Password", type: "password", name: "password", placeholder: "password"},
    ]

    const inputsToBeMapped = isLoggingIn ? authInputs.slice(1, 3) : authInputs
    const name = isLoggingIn ? "Login" : "Register"

    const authInputsMapped = inputsToBeMapped.map(({label, type, name, placeholder}) => (
        <div key={name}>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={changeHandler}
                required
            />
        </div>
    ))

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <fieldset>
                    <legend>{name}</legend>
                    {authInputsMapped}
                    <input
                        type="button" 
                        onClick={() => dispatch(changeIsLoggingIn())} 
                        value={isLoggingIn ? "Create an account?" : "Already have an account?"}
                    />
                    <button type="submit">{name}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Auth