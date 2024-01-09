import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostCreateForm({ setIsForm }) {
    const navigate = useNavigate;
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    async function handlePostCreation() {
        const response = await axios.post(
            "http://localhost:3000/admin/posts",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);

        navigate("/admin/posts");
    }

    return (
        <form
            action="post"
            className="min-h-60 min-w-96 flex flex-col rounded-lg bg-slate-100 justify-around align-middle p-5 border shadow-2xl border-gray-500  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <h1 className="text-lg self-center mb-2">Create Post</h1>
            <label htmlFor="title" className="flex flex-col">
                Title
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300"
                />
            </label>
            <label htmlFor="content" className="flex flex-col mt-2">
                Content
                <textarea
                    type="text"
                    name="content"
                    id="content"
                    className="border-2 h-40 resize-none border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300"
                />
            </label>
            <button
                className="border border-green-700 w-1/2 self-center mt-2 rounded-md shadow-md shadow-green-950 p-2 bg-green-400 transition-all hover:shadow-sm hover:shadow-green-950"
                onClick={handlePostCreation}
            >
                Create
            </button>
        </form>
    );
}
