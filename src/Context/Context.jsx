import { useEffect, useState, createContext } from 'react'
import { ethers } from "ethers";
import abi from "../utils/VotingSystem.json";
import OpenSeaTestABI from "../utils/OpenSeaTest.json";

export const VoterContext = createContext()
var chain_id = "0x5"

export const VoterProvider = ({ children }) => {

    const [chainId, setChainId] = useState("")
    const [nftRole, setNftRole] = useState("");

    const [currentAccount, setCurrentAccount] = useState("")
    const [votingSystemContract, setVotingSystemContract] = useState("");

    const [isManager, setIsManager] = useState(false);
    const [errorPage, setErrorPage] = useState(false)
    const [tokenID, setTokenID] = useState(-1)
    const [winner, setWinner] = useState({ address: "", name: "", proposal: "", votes: 0 })

    const contractAddress = "0x585f59c9143A4E4f94eE34Bba45330b99a27f4Fe"
    const contractABI = abi.abi;

    const OpenseaTestContractAddress = "0xf4910C763eD4e47A585E2D34baA9A4b611aE448C"

    const { ethereum } = window;

    useEffect(() => {

        const getContract = () => {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const votSysContract = new ethers.Contract(contractAddress, contractABI, signer);

            setVotingSystemContract(votSysContract);

        }
        if (ethereum)
            getContract();
    }, [ethereum, contractABI])
  

    useEffect(() => {

        const checkIfManager = async () => {
            try {

                if (window.ethereum && votingSystemContract && currentAccount && chainId === chain_id) {

                    let val = await votingSystemContract.isManager(currentAccount);
                    setIsManager(val);
                }
                else
                    console.log("no metamask wallet");


            } catch (error) {
                console.log(error);
            }
        }


        const setTokenID_Function = async () => {

            try {

                if (window.ethereum && currentAccount && votingSystemContract && chainId === chain_id) {

                    let val = await votingSystemContract.getTokenId();
                    console.log(val)
                    setTokenID(parseInt(val._hex) - 1);
                }

            } catch (error) {
                console.log(error);
            }
        }


        if (currentAccount) {
            checkIfManager();
            setTokenID_Function()
        }


    }, [votingSystemContract, currentAccount, chainId])





    useEffect(() => {

        if (ethereum) {
            ethereum.on("accountsChanged", (accounts) => {

                setCurrentAccount(accounts[0]);
            })

        }
        else
            console.log("No metamask!");

        return () => {
            // ethereum.removeListener('accountsChanged');

        }
    }, [ethereum])



    useEffect(() => {
        const getTeacherNFT  = async () => {

            const provider = new ethers.providers.Web3Provider(ethereum);

            // 根据 ABI 和合约地址创建合约实例
            const openseaTestContract = new ethers.Contract(OpenseaTestContractAddress, OpenSeaTestABI, provider);
            const teacherTokenIds = '89099581206133984420867835859143877944362923373453247343276904189057008926820'; // 要查询余额的ERC1155代币的ID

            const teacherBalances = await openseaTestContract.balanceOf(currentAccount, teacherTokenIds.toString());

            console.log("hold teacher nft account: ",teacherBalances.toString()); // 输出代币余额
   
            const studentTokenIds = '89099581206133984420867835859143877944362923373453247343276904187957497299044'
            const studentBalances = await openseaTestContract.balanceOf(currentAccount, studentTokenIds.toString());
            console.log("hold student nft account: ",studentBalances.toString()); // 输出代币余额
            if(studentBalances.toString()) {
                setNftRole('1')

                if(teacherBalances.toString()) {
                    setNftRole('2')
                }
            } else {
                setNftRole('')

            }
                

            console.log("setNftRole:",nftRole);

        }
        if (currentAccount)
            getTeacherNFT();
    }, [ethereum, currentAccount,nftRole])


    useEffect(() => {
        const checkIfWalletIsConnected = async () => {

            try {

                if (!ethereum) {
                    console.log("Metamask not found")
                    return;
                }
                else
                    console.log("we have etherium object");

                const accounts = await ethereum.request({ method: "eth_accounts" });  //check if there are accounts connected to the site

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log("Found an authorized account:", account);
                    if (currentAccount !== ""){
                        setCurrentAccount(account)
                    }

                    // votingSystem();

                }
                else {
                    setCurrentAccount("")
                    console.log("No authorized accounts found!");
                }


                const curr_chainId = await ethereum.request({ method: 'eth_chainId' });
                setChainId(curr_chainId)
                console.log("setChainId:",curr_chainId);
                ethereum.on('chainChanged', handleChainChanged);


                // Reload the page when they change networks
                function handleChainChanged(_chainId) {
                    window.location.reload();
                }

            } catch (error) {
                console.log(error);
            }
        }

        checkIfWalletIsConnected();
    }, [currentAccount, contractABI, ethereum])



    const connectWallet = async () => {
        try {

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" }); // request connection with accounts
            // console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
            // const chainId = await ethereum.request({ method: 'eth_chainId' });

        }
        catch (e) {
            console.log(e);
        }
    }
    const disConnectWallet = async () => {
        try {

            // 从本地存储中删除钱包地址和私钥等信息
            localStorage.removeItem('walletAddress');
            localStorage.removeItem('walletPrivateKey');

            // // 重置钱包为一个新的空白钱包对象
            // const blankWallet = ethers.Wallet.createRandom();

            // // 将新的空白钱包对象保存到本地存储中，以备将来使用
            // localStorage.setItem('walletAddress', blankWallet.address);
            // localStorage.setItem('walletPrivateKey', blankWallet.privateKey);
            // 跳转到首页
            window.location.reload();
            window.location.href = "/";
            setCurrentAccount("");
            setNftRole("");

        }
        catch (e) {
            console.log(e);
        }
    }


    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chain_id }], // Check networks.js for hexadecimal network ids
            });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        if (chainId !== "0x5" || !currentAccount)
            setErrorPage(true)
        else
            setErrorPage(false)

    }, [chainId, currentAccount])



    return (
        <VoterContext.Provider
            value={{
                chainId, currentAccount, votingSystemContract, isManager, errorPage, nftRole,switchNetwork, connectWallet,disConnectWallet,
            }}
        >
            {children}
        </VoterContext.Provider>
    )
}


