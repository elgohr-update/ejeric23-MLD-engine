import { LocationProvider, Router } from '@reach/router';
import Home from './scenes/Home';
import Match from './scenes/Match';
import React, { useEffect, useMemo, useState } from 'react';
import { useAnalytics } from './hooks';
import { useLocation } from '@reach/router';
import * as web3 from '@solana/web3.js';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet, getSolflareWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

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
    const network = 'devnet';
    const endpoint = web3.clusterApiUrl(network);
    const wallets = useMemo(() => [getPhantomWallet(), getSolflareWallet()], []);

    // UseEffects
    useEffect(() => {
        // window.addEventListener('load', async (event) => {
        //     await checkIfWalletIsConnected();
        // });
    }, []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider logo={require('./images/mld.png')}>
                    <LocationProvider>
                        <RootedApp />
                    </LocationProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
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
            <Home default path="/" />
            <Match path="/:roomId" />
        </Router>
    );
}
