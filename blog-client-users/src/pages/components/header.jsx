import { useState } from "react";
import Model from "./model/model";

export default function Header() {
    const [isForm, setIsForm] = useState(false);

    function handleClose() {
        setIsForm(false);
    }

    return (
        <>
            <header className=" px-16 py-4 bg-[#e8e8e894]  flex justify-between items-center">
                <div className="text-amber-800 text-lg font-bold">
                    BLOG <span className="text-[#423bbf]">POST</span>
                </div>
                <button
                    className="border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold transition-all duration-200 shadow-md hover:shadow-sm shadow-black "
                    onClick={isForm ? setIsForm(false) : setIsForm(true)}
                >
                    Be Our Guest
                </button>
            </header>
            {isForm && <Model modelOpen={isForm} handleClose={handleClose} />}
        </>
    );
}
