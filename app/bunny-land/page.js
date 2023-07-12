import Header from "@/components/Header";
export default function Home() {
  return (
    <main className="bunnyLandSection">
            <Header theme="dark" />
            <div className="bunnyLandContent">
                <div className="slogan">
                    The winners of this race will be the rabbits, stay tuned for more.
                </div>
                <div className="bunnyImg">
                    <img src="/images/bunny-2.png" alt="bunny land"/>
                </div>
            </div>
    </main>
  )
}
