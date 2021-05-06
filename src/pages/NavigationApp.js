import {
    BrowserRouter as Router,
    Route,
    Switch,
    useLocation
} from 'react-router-dom';

import { Splash } from './Splash';
import { Signup } from './Signup';
import { Signin } from './Signin';
import { NotFound } from './NotFound';
import { Home } from './Home';
import { Schedule } from './Schedule';
import { CreateTask } from './CreateTask';
import { TaskDetail } from './TaskDetail';
import { Fragment, useEffect, useState } from 'react';
import { Menu } from "../components/Menu"
import { PageWrapperMenu } from "../globalStyles";

const AuthenticatedUser = ({children}) => {

    const {pathname} = useLocation();

    useEffect(() => {
        
    }, [pathname]);

    return (
        <Fragment>
            <PageWrapperMenu>
                {children}
            </PageWrapperMenu>
            <Menu pathname={pathname} />
        </Fragment>
    )
}

const NotAuthenticatedUser = ({children}) => {
    return children;
}

export const NavigationApp = () => {

    const [auth, setAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(()  => {
        setTimeout( () => {
            setAuth(true);
            setIsLoading(false);
        }, 1000)
    }, []);

    if ( isLoading ) {
        return <Splash />
    }

    return (
        <Router>
            {
                !auth && (
                    <NotAuthenticatedUser>
                        <Switch>
                            <Route exact path="/" component={Signin} />
                            <Route path="/signup" component={Signup} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </NotAuthenticatedUser>
                )
            }
            
            {
                auth && (
                    <AuthenticatedUser>
                        <Switch>
                            <Route exact path="/"> 
                                <Home title="Tasks"/>
                            </Route>
                            <Route path="/schedule">
                                <Schedule title="Schedules"/>
                            </Route>
                            <Route path="/create">
                                <CreateTask title="Create newtask"/>
                            </Route>
                            <Route path="/detail/:id"> 
                                <TaskDetail title="Task detail"/>
                            </Route>
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </AuthenticatedUser>
                )
            }  
        </Router>
    );
};
