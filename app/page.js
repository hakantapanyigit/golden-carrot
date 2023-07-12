import Header from "@/components/Header";
import Socials from "../components/Socials";
export default function Home() {
  return (
    <main className="homeSection">
        <Header />
        <Socials/>
        <div className="bunny">
            <img src="/images/bunny.png" alt="bunny" />
        </div>
    </main>
  )
}
