import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Check if running in the context of a web page or as part of an extension popup
    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setCurrentUrl(tabs[0].url!);
      });
    } else {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* Display current URL */}
      <div className="mt-4 p-5 bg-blue-100 rounded-md">
        <p>Current URL:</p>
        <p className="break-all">{currentUrl}</p>
      </div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1")!.showPopover()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
