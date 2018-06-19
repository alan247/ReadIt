import React, { Component } from "react";
import {Route, Switch} from "react-router-dom"
import Header from "./components/Header"
import CategoryView from "./components/CategoryView"
import NewPost from "./components/NewPost"
import ViewPost from "./components/ViewPost"
import AddButton from "./components/AddButton"
import EditPost from "./components/posts/EditPost"

class App extends Component {
  render() {

    return (
        <div className="app">
          <Header  />
          <Switch>
            <Route exact path="/" component={CategoryView} />
            <Route exact path="/create" component={NewPost} />
            <Route exact path="/:category" component={CategoryView} />
            <Route exact path="/:category/:postId" component={ViewPost}  />
            <Route exact path="/:category/:postId/edit" component={EditPost}  />
          </Switch>
          <AddButton />
        </div>
    )
  }
}

export default App