"use client"

import * as React from "react";

import H1 from "@/components/H1"
import {forms} from "@/libs/form"
import Input from "@/components/Input"
import FileUpload from "@/components/FileUpload";
import Button from "@/components/Button";

export default function Home() {
  const [file, setFile] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change")
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleSubmit = () => {

  }

  return (
    <main className="bg-white rounded-lg px-24 py-16">
      <H1 text={"Create an Ad"}/>
      <span className="block my-4">Test Wallet Address:</span>
      <div className="grid grid-cols-2 gap-8">
        {
          forms.map((form) => {
            return (
              <div key={form.id} className="flex flex-col gap-12">
               <Input 
                  id={form.id}
                  label={form.text}
                  type="text"
                  placeholder={form.text}
                  value={""}
                  onChange={handleChange}
               />
              </div>
            )
          })
        }
        <FileUpload url={file} onChange={handleImage}/>
      </div>
      <div className="flex justify-center mt-8">
        <Button text={"Create"} type={"button"} customClass="px-32 py-8" onClick={handleSubmit} />
      </div>
    </main>
  );
}
