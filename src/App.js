import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";

import Search from "./Pages/Search/Search";
import Favorites from "./Pages/Favorites/Favorites";
import SimpleBottomNavigation from "./components/MainNav/MainNav";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Search} exact />
            <Route path="/favorites" component={Favorites} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
