import { useDispatch } from "react-redux"
import { logout } from "../../redux/userSlice"

const Header = () => {
    const dispatch = useDispatch()

    return (
        <header>
            <h1>Header</h1>
            <nav>Home</nav>
            <input type="button" onClick={() => dispatch(logout())} value="logout"/>
        </header>
    )
}

export default Header