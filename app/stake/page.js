'use client'
import Header from "@/components/Header";
import Socials from "../../components/Socials";
import { connect, disconnect } from "get-starknet"
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function Home() {
    const apiURL = "https://stake-api-carrot.vercel.app"
    const status = true;

    let [control,setControl] = useState(0)

    let [data, setData] = useState({stake: false, data: Array(0), count: 0})
     
    let [controlCount, setCount ] = useState(0)

    const [walletAddr,setWallet] = useState("")
    let targetAddress = "0x0" + walletAddr.substring(2);
    
    console.log(walletAddr)

    async function handleDisconnect(options) {
        await disconnect(options)
    }
    
    const controller = async()=>{
        const res = await axios.get(`${apiURL}/control/`+targetAddress);
        setData(res.data)
        if(controlCount>0 && res.data.count  == 0){
            Swal.fire(
                'Information',
                'You must have some rabbits !',
                'question'
              )
        }
        setCount(controlCount+1)
       
        console.log(data)
    }


    useEffect( ()=>{
        controller();
    },[walletAddr])

    useEffect(()=>{handleDisconnect()},[])

    const stake= async()=>{
        const res = await axios.get(`${apiURL}/stake/`+targetAddress);

        const {success} = res.data 

        if(success){
                Swal.fire({
                    title: 'Congratulations!',
                    html: '<p style="font-size: 14px;">Your Stake has been completed!</p>',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    confirmButtonColor: '#FFA500', 
                    confirmButtonText: 'OK' 
                  });
                  controller();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '**'
              })
        }
    }

  return (
    <main className="goldenCarrotSection">
        <div className="goldenBg">
            <Header theme="dark"/>
            <Socials/>
            <div className="goldenCarrotContent">
                <div className="leftContent">
                    <img src="/images/carrot.jpg" alt="golden carrot"/>
                </div>
                <div className="rightContent">
                    <h6>
                    Welcome to the second stage bunnies 
                    <br></br>
                    1 bunny = 1 $Carrot / Daily 
                    <br></br>
                    Just press the Stake button once, and your bunny will stay in your wallet, and your daily earnings will be processed to your wallet as long as you dont put it up for sale or transfer it                     <br></br>
                    Whats next? Bunnyland is coming, stay tuned 
                    </h6>
                    <br></br>
        {data.count > 0 ? 'Your Daily Reward : ' + data.count : ''}
        <br></br>
        {data.stake  ? 'Your Total Reward : ' + data.data[0].point :''}
        
        {status ?  (walletAddr != '' ?  
        
           (data.stake == false && data.count > 0  ? <a className="mintButton" onClick={stake}>
           Stake
           </a> : '')
       
           : <a className="mintButton" onClick={
            async () => {
                try {
                    const wallet = await connect({
                        include: ["argentX","braavos"],
                        
                    });
                    setWallet(wallet?.account?.address)
                    if (wallet) {
                        await wallet.enable({ showModal: true });
                    }
                } catch (err) {
                    console.error(err);
                }
            }
         }>
            Connect Wallet
            </a>  ) :''}

                </div>
            </div>
        </div>
    </main>
  )
}
