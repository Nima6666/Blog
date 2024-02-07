import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/slices/userSlice";

export default function Verification() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { key } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = key;
                const response = await axios.get(
                    `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
                );
                console.log(response.data);
                const id = response.data.sub;
                const loggedInUser = await axios.post(
                    `${import.meta.env.VITE_SERVERAPI}/getLoggedInUser`,
                    { id: id }
                );
                console.log(loggedInUser, "logged in");
                dispatch(userActions.setUser(await loggedInUser.data));
                navigate("/");
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [key]);
}
