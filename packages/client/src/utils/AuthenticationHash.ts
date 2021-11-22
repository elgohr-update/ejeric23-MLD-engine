import SignData from './SignData';

const AuthenticationHash = async (
    username: any,
    accountAddress: any,
    password: any,
    digiCode: any,
    web3: { eth: any },
) => {
    const signedMessage = await SignData(username, accountAddress, web3);
    const passwordDigiCodeHash = await web3.eth.accounts.hashMessage(password + digiCode);

    // eslint-disable-next-line no-return-await
    return await web3.eth.accounts.hashMessage(signedMessage + passwordDigiCodeHash);
};

export default AuthenticationHash;
