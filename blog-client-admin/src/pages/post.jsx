import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";

import { GrFormEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

export default function Post() {
    const navigate = useNavigate();

    const [data, setData] = useState(localStorage.getItem("data"));

    const token = localStorage.getItem("token");
    const dataJson = JSON.parse(data);

    let theOne;

    const { id } = useParams();

    const exists = dataJson.some((item) => {
        if (id === item.url) {
            theOne = item;
            return true;
        }
        return false;
    });

    useEffect(() => {
        if (!exists) {
            navigate("/blogs");
        }
    });

    async function handleDelete() {
        const response = await axios.delete(
            `http://localhost:3000/admin/posts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data.success) {
            toast("deleted");
            navigate("/blogs");
        } else {
            console.error("error deleting post");
        }
    }

    async function handlePublish() {
        const response = await axios.patch(
            `http://localhost:3000/admin/posts/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        navigate("/blogs");

        if (response.data.success) {
            window.location.reload();
        } else {
            console.error("error updating post");
        }
    }

    if (exists) {
        return (
            <div className="relative bg-gray-200 rounded-md shadow-lg p-4 m-8">
                <div id="iconsED" className="flex justify-end w-[100]">
                    {theOne._doc.published && (
                        <button
                            className="flex items-center m-2 border border-red-600 rounded-md shadow-md shadow-red-950 p-2 bg-red-400 transition-all hover:shadow-sm hover:shadow-red-950"
                            onClick={handlePublish}
                        >
                            Unpublish
                            <MdUnpublished className="size-7 " />
                        </button>
                    )}
                    {!theOne._doc.published && (
                        <button
                            className="flex items-center m-2  border border-green-700 mt-2 rounded-md shadow-md shadow-green-950 p-2 bg-green-400 transition-all hover:shadow-sm hover:shadow-green-950"
                            onClick={handlePublish}
                        >
                            Publish
                            <MdPublishedWithChanges className="size-7 " />
                        </button>
                    )}
                    <button className="flex items-center m-2  border border-green-700 mt-2 rounded-md shadow-md shadow-green-950 p-2 bg-green-400 transition-all hover:shadow-sm hover:shadow-green-950">
                        Edit
                        <GrFormEdit className="size-7 " />
                    </button>
                    <button
                        className="flex items-center m-2 border border-red-600 rounded-md shadow-md shadow-red-950 p-2 bg-red-400 transition-all hover:shadow-sm hover:shadow-red-950"
                        onClick={handleDelete}
                    >
                        Delete
                        <MdDeleteOutline className="size-7" />
                    </button>
                </div>
                <h1 className="font-bold text-xl mb-2">{theOne._doc.title}</h1>
                <p>{theOne._doc.content}</p>
            </div>
        );
    }
}
