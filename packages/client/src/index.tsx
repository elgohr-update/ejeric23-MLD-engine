import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/globals.css';
import './styles/Home.module.css';
import './styles/header.css';
import { HarmonyProvider } from './context/harmonyContext';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibraryProvider } from './utils/provider';

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibraryProvider}>
            <HarmonyProvider>
                <App />
            </HarmonyProvider>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
