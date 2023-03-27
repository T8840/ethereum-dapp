import { useContext, useEffect } from "react";
import { VoterContext } from "./Context/Context";
import ethImg from './utils/eth.gif'
import './styles/App.css';
import { useNavigate } from "react-router-dom"


function Home() {

    const { currentAccount, connectWallet, chainId, switchNetwork, nftRole } = useContext(VoterContext)
    const navigate = useNavigate();
    var chain_id = "0x5"
    useEffect(() => {
        if (currentAccount && chainId === chain_id ) {
            if (nftRole !== "") {
                // 在这里执行 nftRole 有值时需要执行的操作
                console.log("NFT ROLE: ", nftRole)
                navigate("/system")
              }

        } 
        // if (currentAccount && chainId === chain_id&& nftRole === "2") {
        //     navigate("/system")
        // }

    }, [currentAccount, navigate, chainId, nftRole])


    return (
        <>
            <div className='home_content'>
                <div className='pe-5'>
                    <div className='text-white ' style={{ fontSize: "22px" }}>
                        The <b>Decentralized Students System</b> (DSS) provides <br />
                        a platform for students info manage. Features include: <br />
                        <ul>
                            <li>
                                Use MetaWallet and SBT control auth
                            </li>
                            <li>Only hold teacher SBT can add, edit students info</li>
                            <li>Hold student SBT can view score</li>
                            <li>SBT can visit in the Opensea<a href="https://testnets.opensea.io/collection/school-1-1">click this visit </a></li>
                            <li>If you connect the wallet still on the page, Seems like you dont't own the SBT.</li>
                        </ul>

                    </div>
                    {
                        !currentAccount && (<div className='mt-3'>
                            <button className='bttn_ui' onClick={connectWallet}>Connect Wallet</button>
                        </div>
                        )
                    }

                    {
                        currentAccount && (chainId !== chain_id) &&
                        (<div className='mt-1'>
                            <button className='bttn_ui' onClick={switchNetwork}> Switch Network</button>
                            <div style={{ color: "#ffa6b8" }}>The network connected is incompactable, kindly switch to Goerli(Goerli testnet) network :)</div>

                        </div>)
                    }
                </div>
                <div className='ps-5 d-none d-md-block'>
                    <img src={ethImg} alt="" />
                </div>
            </div>
        </>
    )
}

export default Home
