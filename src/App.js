import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import store from "src/redux/store";
import { Preloader } from "src/components/Preloader";
import { PrivateRoute } from "src/components/PrivateRoute";
import { MainPage, LoginPage, LeaderBoardPage } from "src/containers";
import { RoutesNames } from "src/constants";


function App() {
    return (
        <Suspense fallback={<Preloader />}>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute
                            exact
                            path={RoutesNames.home}
                            component={MainPage}
                        />
                        <Route
                            exact
                            path={RoutesNames.login}
                            render={LoginPage}
                        />
                        <Route
                            exact
                            path={RoutesNames.leaderboard}
                            render={(props) => <LeaderBoardPage {...props} />}
                        />
                        <Route
                            path="*">
                            <Redirect to={RoutesNames.home} />
                        </Route>
                    </Switch>
                </BrowserRouter>
                <Preloader />
            </Provider>
        </Suspense>
    );
}

export default App;
