import { Switch, Route, Redirect } from "react-router";
import Home from '../components/home/Home'
import Posts from "../components/posts/Posts";
import Albums from "../components/albums/Albums";
import ToDos from '../components/todos/ToDos'

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/albums" component={Albums} />
      <Route exact path="/todos" component={ToDos} />
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default Routes