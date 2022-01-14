import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/apiConfig";

import LoadingPage from "./LoadingPage";

export default function Info() {
    const [infoData, setInfoData] = useState([]);

    useEffect(() => {
        const fetchInfo = async() => {
            const res = await api.get('info');
            setInfoData(res.data.records);
        };
        fetchInfo();
    }, []);

    if (infoData.length === 0) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2>Choose a category:</h2>
            <ul>
                {infoData.map((info) => {
                    return (
                        <li key={info.id}>
                            <Link to={`/info/${info?.id}`}>
                                <h3>{info?.fields.category}</h3>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
