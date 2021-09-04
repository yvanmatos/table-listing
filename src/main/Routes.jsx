import { Switch, Route, Redirect } from "react-router";
import Home from '../components/home/Home'
import Posts from "../components/posts/Posts";
import Albums from "../components/albums/Albums";
import ToDos from '../components/todos/ToDos'
import Photos from "../components/albums/Photos";

const Routes = (props) => {
  return(
    <Switch location={props.location}>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/albums" component={Albums} />
      <Route exact path="/todos" component={ToDos} />
      <Route exact path="/photos/:albumId" component={Photos} />
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default Routes