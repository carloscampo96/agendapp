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
import React, { Fragment, useEffect, Suspense } from 'react';
import { Menu } from "../components/Menu"
import { PageWrapperMenu } from "../globalStyles";
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin } from '../store';
import { Loading } from '../components/Loading';
import { redirectDone } from './../store';
const Home = React.lazy(() => import('./Home'));
const Schedule = React.lazy(() => import('./Schedule'));
const CreateTask = React.lazy(() => import('./CreateTask'));
const TaskDetail = React.lazy(() => import('./TaskDetail'));

const AuthenticatedUser = ({children}) => {

    const dispatch = useDispatch();
    const {pathname} = useLocation();

    useEffect(() => {
        dispatch(redirectDone());
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

    const userData = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(()  => {
        setTimeout( () => {
            dispatch(autoLogin());
        }, 500)
    }, []);

    if ( userData.splash ) {
        return <Splash />
    }

    return (
        <Router>
            {
                !userData.isAuth && (
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
                userData.isAuth && (
                    <AuthenticatedUser>
                        <Switch>
                            <Route exact path="/">
                                <Suspense fallback={<Loading />}>
                                    <Home title="Tasks"/>
                                </Suspense> 
                            </Route>
                            <Route path="/schedule">
                                <Suspense fallback={<Loading />}>
                                    <Schedule title="Schedules"/>
                                </Suspense> 
                            </Route>
                            <Route path="/create">
                                <Suspense fallback={<Loading />}>
                                    <CreateTask title="Create newtask"/>
                                </Suspense>
                            </Route>
                            <Route path="/detail/:id"> 
                                <Suspense fallback={<Loading />}>
                                    <TaskDetail title="Task detail"/>
                                </Suspense>
                            </Route>
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </AuthenticatedUser>
                )
            }  
        </Router>
    );
};
