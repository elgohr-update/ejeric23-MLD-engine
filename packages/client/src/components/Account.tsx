import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import {
    Box,
    Button,
    GitHub,
    IListItem,
    Inline,
    Input,
    Room,
    Select,
    Separator,
    Space,
    Text,
    View,
} from '../components';
import { useWeb3React } from '@web3-react/core';
import { toBech32 } from '@harmony-js/crypto';
import { isBech32Address } from '@harmony-js/utils';

import SignOut from './SignOut';
import Wallets from './Wallets';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const customStyles = {
    content: {
      height: "40%",
      textAlign: "center"
    }
  };


const Account = (props: any) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const { account, active } = useWeb3React();

    const parsedAccount = props.account && !isBech32Address(props.account) ? toBech32(props.account) : props.account;

    const openModal = () => {
        setModalIsOpen(true);
        console.log('Account: ', props.account);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                className="Modal"
                // overlayClassName="Overlay"
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick
            >
                {props.active ? (
                    <SignOut account={parsedAccount} closeModal={closeModal} />
                ) : (
                    <Wallets closeModal={closeModal} />
                )}
            </Modal>
            <AccountComponent onClick={openModal}>
                {parsedAccount ? (
                    <span>
                        {'Wallet: ' + parsedAccount.substring(0, 6)}...
                        {parsedAccount.substring(parsedAccount.length - 4)}
                    </span>
                ) : (
                    <Button onClick={openModal}>Connect your wallet</Button>
                )}
            </AccountComponent>
        </>
    );
};

const AccountComponent = styled.div`
    padding: 10px 20px;
    border-radius: 25px;
    background-color: white;
    opacity: 0.7;
    box-shadow: 1px 2px 4px 4px rgba(0, 0, 0, 0.25);
    color: black;
    transition: opacity 0.3s ease, box-shadow 0.25s ease-in-out;
    &:hover {
        opacity: 1;
        box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
`;

export default Account;
