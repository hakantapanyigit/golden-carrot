"use client";
export default function Socials() {

    return (
        <div className="socials">
            <div className="coming-soon">
                <span>Coming Soon</span>
            </div>
            <a
             //   onClick={
             //       (e) => {
             //           e.preventDefault();
             //           document.querySelector('.coming-soon').classList.add('activeModal');
             //           setTimeout(() => {
             //               document.querySelector('.coming-soon').classList.remove('activeModal');
             //           }, 1000);
             //       }
             //   }
                href="https://discord.gg/2WwcS86J">
                <img src="/images/discord-square-color-icon.png" alt="discord" />
            </a>
            <a href="https://twitter.com/StarknetBunny" target="_blank">
                <img src="/images/twitter-app-icon.png" alt="twitter" />
            </a>
        </div>
    )
}