import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";

import { postActions } from "../store/slices/posts";

import { GrFormEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export default function Post() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    // const dataJson = useSelector((state) => state.postReducer.posts);

    let theOne = useSelector((state) => state.postReducer.selPost);

    const { id } = useParams();

    // const exists = dataJson.some((item) => {
    //     if (id === item.url) {
    //         theOne = item;
    //         return true;
    //     }
    //     return false;
    // });

    async function getSelectedPost() {
        const responseSelectedPost = await axios.get(
            `http://localhost:3000/admin/posts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    admin: user,
                },
            }
        );
        console.log(responseSelectedPost);

        dispatch(postActions.setSelPost(responseSelectedPost.data.post));
    }

    useEffect(() => {
        getSelectedPost();

        // if (!exists) {
        //     navigate("/blogs");
        // }
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

        if (response.data.success) {
            window.location.reload();
        } else {
            console.error("error updating post");
        }
    }

    return (
        <div className="relative bg-gray-200 rounded-md shadow-lg p-8 m-8">
            <div id="iconsED" className="flex justify-end w-[100]">
                {theOne.published && (
                    <button
                        className="flex items-center m-2 border border-red-600 rounded-md shadow-md shadow-yellow-950 p-2 bg-yellow-500 transition-all hover:shadow-sm hover:shadow-yellow-950"
                        onClick={handlePublish}
                    >
                        Unpublish
                        <MdUnpublished className="size-7 " />
                    </button>
                )}
                {!theOne.published && (
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
            <h1 className="font-bold text-xl mb-2">{theOne.title}</h1>
            <p className="text-justify">{theOne.content}</p>
        </div>
    );
}
