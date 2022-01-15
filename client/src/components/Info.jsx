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
            <h2 className="text-xl">Choose a <span className="text-lime-700">category</span>:</h2>
            <ul className="text-center bg-lime-700 px-6 pt-6 m-6 shadow-lg">
                {infoData.map((info) => {
                    return (
                        <li key={info.id}>
                            <Link to={`/info/${info?.id}`}>
                                <h3 className="text-lime-400">{info?.fields.category}</h3>
                                <br/>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
