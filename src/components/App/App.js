import { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from "react-router"
import Auth from "../Auth/Auth"
import Header from "../Header/Header"
import Home from "../Home/Home"
import { useSelector } from 'react-redux'

const App = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const status = useSelector(state => state.user.status)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
      if (!isLoggedIn && status !== "pending") history.push("/auth")
  }, [isLoggedIn, history, status])

  return (
    <main>
      {location.pathname !== "/auth" ? <Header /> : null}
      <Switch>
        <Route exact path="/"> <Home /> </Route>
        <Route path="/auth"> <Auth /> </Route>
      </Switch>
    </main>
  )
}

export default App