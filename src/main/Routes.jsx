import { Switch, Route, Redirect } from "react-router";
import Home from '../components/home/Home'
import Posts from "../components/posts/Posts";

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts" component={Posts} />
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default Routes