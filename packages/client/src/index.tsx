import './index.css';
import * as serviceWorker from './serviceWorker';
import { WalletProvider, getChainOptions } from '@terra-money/wallet-provider';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/globals.css';
import './styles/Home.module.css';
import './styles/header.css'



getChainOptions().then((chainOptions) => {
    ReactDOM.render(
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WalletProvider {...chainOptions}>
            <App />
        </WalletProvider>,
        document.getElementById('root'),
    );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
