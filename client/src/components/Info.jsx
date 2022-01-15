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
            <ul className="text-center bg-lime-700 px-6 pt-6 m-6 drop-shadow-2xl rounded-lg">
                {infoData.map((info) => {
                    return (
                        <li key={info.id}>
                            <Link to={`/info/${info?.id}`}>
                                <h3
                                    className="text-lime-400 hover:text-lime-300 hover:-translate-y-0.5 transform transition
                                    focus:outline-none focus:ring focus:ring-lime-400 focus:ring-opacity-50
                                    active:text-lime-500"
                                >
                                    {info?.fields.category}
                                </h3>
                                <br/>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
