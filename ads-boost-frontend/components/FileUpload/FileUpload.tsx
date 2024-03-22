import Image from "next/image"; 
import { FaImage } from "react-icons/fa6";

interface FileUploadTypeProp {
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload:React.FC<FileUploadTypeProp> = ({...props}) => {

    const {url, onChange} = props;

    return (
      <>
        {url && <div className=" w-full max-w-96">
            <Image  src={url}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt="adds-boost logo"
                      className="cursor-pointer w-full"
            />
            <label htmlFor="file-input" className="bg-teal-500 hover:bg-teal-400 rounded-lg text-white font-semibold px-4 py-3 mt-2 mx-atuo block text-center text-sm cursor-pointer">Change Image</label>         
            <input type="file" onChange={onChange} id="file-input" className="hidden"/>
        </div>}
        {!url && (
          <label id="file-input" className="mt-2  text-sm font-semibold 
                                            w-full max-w-96 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                                         text-gray-900">
            <input type="file" onChange={onChange} id="file-input" className="hidden"/>
            <svg
              className="mx-auto w-12 h-12  text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
            <FaImage size={"3rem"} className="cursor-pointer rounded-lg "/>
            </svg>
           <span className="text-xs text-gray-600">Upload your Image</span>
          </label>
        )}
      </>
    )
  }
  
export default FileUpload;