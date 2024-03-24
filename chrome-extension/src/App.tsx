import { useState, useEffect } from "react";
import "./App.css";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

import { WalletOptions } from "./wallet-options";
import { useAccount } from "wagmi";
import { Account } from "./account";

function App() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setCurrentUrl(tabs[0].url!);
      });
    } else {
      setCurrentUrl(window.location.href);
    }
  }, []);

  function transferNFT() {
    console.log("Transfer NFT");
  }

  const nfts = [
    {
      name: "ETHTaipei-2024",
      imageUrl:
        "https://s.yimg.com/ny/api/res/1.2/MF1UvoHNx96DpLSSaaFDDQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTY0MA--/https://media.zenfs.com/en/the_defiant_332/eae09bafa4c8b713387d110d3fdf2b75",
      targetUrl: "https://www.google.com",
      keywords: ["uniswap", "gambling"],
      description: "Complete tasks by visiting the link below.",
    },
    {
      name: "Let's attend ETHTaipei!!",
      imageUrl:
        "https://ethtaipei.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-eth-tpe-w.a4ac4d9c.png&w=3840&q=75",
      targetUrl: "https://www.google.com",
      keywords: ["uniswap", "taipei"],
      description: "Complete tasks by visiting the link below.",
    },
  ];

  // 检查当前URL是否包含任何NFT的关键词
  const displayedNfts = nfts.filter((nft) =>
    nft.keywords.some((keyword) => currentUrl.includes(keyword))
  );

  return (
    <>
      {<ConnectWallet />}
      {displayedNfts.length > 0 ? (
        <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
          {displayedNfts.map((nft, index) => (
            <div className="carousel-item" key={index}>
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={nft.imageUrl} alt="NFT" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{nft.name}</h2>
                  <p>{nft.description}</p>
                  <div className="card-actions justify-end">
                    <a
                      href={nft.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Go to Task
                    </a>
                    <button className="btn" onClick={() => transferNFT()}>
                      Transfer NFT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No relevant data</div>
      )}
    </>
  );
}

export default App;
