import Header from "@/components/Header";
import Socials from "../../components/Socials";
export default function Home() {
  return (
    <main className="goldenCarrotSection">
        <div className="goldenBg">
            <Header theme="dark" />
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
                    <a className="mintButton">
                        Mint
                    </a>
                </div>
            </div>
        </div>
    </main>
  )
}
