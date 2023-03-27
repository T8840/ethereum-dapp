import React from 'react'
import { useContext, useEffect } from "react";
import { VoterContext } from "../Context/Context";

function Navbar({ user }) {
    const {  currentAccount,disConnectWallet} = useContext(VoterContext)

    return (
        <div className='head_navbar rounded'>
            <h2>
                Decentralized Students System
            </h2>
            {user && <div className='bg-dark text-white p-1'>{user}  <button className='bttn_ui' onClick={disConnectWallet}>DisConnect Wallet</button> </div>
            }
            
        </div>
    )
}

export default Navbar