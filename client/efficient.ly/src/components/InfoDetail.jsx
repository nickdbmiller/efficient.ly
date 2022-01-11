import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import api from "../services/apiConfig";
import LoadingPage from "./LoadingPage";

export default function InfoDetail() {
    const [info, setInfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchInfo = async() => {
            const res = await api.get(`info/${id}`);
            console.log(res.data);
            setInfo(res.data);
        };
        fetchInfo();
    }, []);

    if (!info.fields) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2>{`${info.fields?.category} Information`}</h2>
        </div>
    )
}
