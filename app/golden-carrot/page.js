'use client'
import Header from "@/components/Header";
import Socials from "../../components/Socials";
import { connect, disconnect } from "get-starknet"
import { useEffect, useState } from "react";
import axios from "axios";
import WL from "./wl.json"
import Swal from "sweetalert2";
export default function Home() {
    const apiURL = "https://carrot-api.vercel.app"
    const status = false;

    const textTweet = "I have been chosen for @StarknetBunny and we will create an amazing community together. I minted my Golden Carrot, the race has begun, and of course the bunnies will be the winners. LFG!" 
    const imageURI = "https://imgur.com/a/dFTupUt"
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textTweet)}&url=${encodeURIComponent(imageURI)}`;

    let [control,setControl] = useState(0)

    const [isMinted,setMinted] = useState(false)

    const [walletAddr,setWallet] = useState("")
    let targetAddress = "0x0" + walletAddr.substring(2);
    
    console.log(walletAddr)
    const match = WL.filter(item=>item.toLowerCase() === targetAddress.toLowerCase())

    async function handleDisconnect(options) {
        await disconnect(options)
    }
    const isMint = async()=>{
        const res = await axios.get(`${apiURL}/control/`+targetAddress);
        console.log(res)
        if(res.data?.length > 0){
            setMinted(true)
        }
    }
    useEffect( ()=>{
        isMint();
    },[walletAddr])

    useEffect(()=>{handleDisconnect()},[])

    const mint= async()=>{
        if(control===0){
            window.open(tweetUrl, '_blank');
            setControl(1)
            const res = await axios.get(`${apiURL}/mint/`+targetAddress);
            console.log(res)
            const {success, whitelist} = res.data

            if(success){
                if(whitelist){
                    Swal.fire({
                        title: '********Text Message ****** ',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                }
            }else{

                if(whitelist){
                    Swal.fire(
                        'Information',
                        'Already minted?',
                        'question'
                      )
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '**'
                      })
                }
                
            }


        }
    }

  return (
    <main className="goldenCarrotSection">
        <div className="goldenBg">
            <Header theme="dark"/>
            <Socials/>
            <div className="goldenCarrotContent">
                <div className="leftContent">
                    <img src="/images/golden-carrot.png" alt="golden carrot"/>
                </div>
                <div className="rightContent">
                    <h6>
                        Dear GC winners, the protagonists of our story,
                        Golden Carrots the Bunny collection will be closed for sales and transfers until it is sold out. Each of you has the opportunity to distribute 5 whitelist spots to your community. Yes, you have been chosen to create a unique community for the Bunnies. As a Golden Carrot holder, you can mint 1 Free Bunny and an additional Bunny at the whitelist price. More utilities will be announced soon. Just know that you are incredibly lucky for being chosen.
                    </h6>

        
        {status ?  (walletAddr != '' ?  
    (match.length > 0 ?  ( control == 0  ?(!isMinted?<a className="mintButton" onClick={mint}>
    Mint
    </a>:'Already Minted'):'')  : <center>You are not eligible !</center>)

    :  <a className="mintButton" onClick={
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
