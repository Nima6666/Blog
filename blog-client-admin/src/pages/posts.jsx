import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Posts() {
    const navigate = useNavigate(); // Corrected the usage of useNavigate
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [isUserLoggedIn, setUserLogin] = useState(true);

    useEffect(() => {
        if (!user) {
            setUserLogin(false);
        } else {
            setUserLogin(true);
        }
    }, [user]);

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/");
        }
    }, [isUserLoggedIn]);

    return <>{isUserLoggedIn && <h1>Welcome {user}</h1>}</>;
}
