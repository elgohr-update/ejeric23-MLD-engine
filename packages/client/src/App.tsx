import { LocationProvider, Router } from '@reach/router';
import Gun from 'gun';
import Home from './scenes/Home';
import Match from './scenes/Match';
import React from 'react';
import { useAnalytics } from './hooks';
import { useLocation } from '@reach/router';

const gun = Gun({
    peers: ['http://localhost:3030/gun'],
});

interface IAppState {
    user: any;
}

const initialState: IAppState = {
    user: {},
};

export function reducer(state: any, user: any) {
    return {
        user: [user, ...state.user],
    };
}

export default function App(): React.ReactElement {
    return (
        <LocationProvider>
            <RootedApp />
        </LocationProvider>
    );
}

function RootedApp(): React.ReactElement {
    const { pathname } = useLocation();
    const analytics = useAnalytics();
    const [state, dispatch] = React.useReducer(reducer, initialState);

    /**
     * Initialize analytics.
     */
     React.useEffect(() => {
        analytics.init();
    }, [analytics]);

    /**
     * Listen to page changes.
     */
    React.useEffect(() => {
        analytics.page(pathname);
    }, [analytics, pathname]);

    return (
        <Router>
            <Home state={state} dispatch={dispatch} gun={gun} default path="/" />
            <Match path="/:roomId" />
        </Router>
    );
}
