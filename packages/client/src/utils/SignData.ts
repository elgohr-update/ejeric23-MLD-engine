const SignData = async (
    username: any,
    accountAddress: any,
    web3: {
        eth: {
            personal: { sign: (arg0: any, arg1: any, arg2: (err: any, signature: any) => void) => any };
            accounts: { hashMessage: (arg0: any) => any };
        };
    },
) => {
    let signedData;

    await web3.eth.personal.sign(username, accountAddress, (err, signature) => {
        if (err) {
            signedData = err;
        } else {
            signedData = web3.eth.accounts.hashMessage(signature);
        }
    });

    return signedData;
};

export default SignData;
