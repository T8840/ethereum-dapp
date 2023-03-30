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
                         <b>去中心化学生管理系统</b> 
                        是一个学生信息管理平台. 有以下特点: <br />
                        <ul>
                            <li>
                                1）使用MetaWallet钱包和SBT进行身份认证
                            </li>
                            <li>2）只有持有teacherSBT的钱包才允许新增、修改、删除学生信息</li>
                            <li>3）持有学生SBT的钱包只允许采矿学生成绩信息</li>
                            <li>SBT可以通过该网站进行查看：<a href="https://testnets.opensea.io/collection/school-1-1">click this visit </a></li>
                            <li>如果您登录钱包后仍然还在该页面，那说明您还未持有SBT.请联系管理员获取SBT.</li>
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
