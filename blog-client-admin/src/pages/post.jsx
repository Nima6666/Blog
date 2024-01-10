import { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./Error";

import { GrFormEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

export default function Post() {
    const data = localStorage.getItem("data");
    const token = localStorage.getItem("token");
    const dataJson = JSON.parse(data);

    let theOne;

    console.log(dataJson);

    const { id } = useParams();

    const exists = dataJson.some((item) => {
        if (id === item.url) {
            theOne = item;
            console.log("theOne: ", theOne);
            return true;
        }
        return false;
    });

    async function handleDelete() {
        console.log("should Delete");

        const response = axios.delete(
            `http://localhost:3000/admin/posts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }

    if (exists) {
        return (
            <div className="relative bg-gray-200 rounded-md shadow-lg p-4 m-8">
                <h1 className="font-bold text-xl mb-2">{theOne._doc.title}</h1>
                <p>{theOne._doc.content}</p>
                <div id="iconsED" className="flex justify-end w-[100] mt-4">
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
            </div>
        );
    } else {
        return <ErrorPage />;
    }
}
