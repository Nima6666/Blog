export default function Header() {
    return (
        <header className=" px-6 py-4 bg-[#e8e8e894]  flex justify-between items-center">
            <div className="text-amber-800 text-lg font-bold">
                Blog <span className="text-[#423bbf]">Post</span>
            </div>
            <button className="border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold transition-all duration-200 shadow-md hover:shadow-sm shadow-black ">
                Be Our Guest
            </button>
        </header>
    );
}
