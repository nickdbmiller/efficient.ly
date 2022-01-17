import { useEffect, useState } from "react";
import api from "../services/apiConfig";
import LoadingPage from "./LoadingPage";

export default function Saved() {
    const [saveData, setSaveData] = useState([]);

    useEffect(() => {
        const fetchSaveData = async() => {
            const res = await api.get('heatingData');
            setSaveData(res.data.records);
        };
        fetchSaveData();
    }, []);

    if (saveData.length === 0) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className="text-xl"><span className="text-lime-700 font-bold">Saved</span> data:</h2>
            <ul
                className="grid grid-col-1 lg:grid-cols-3"
            >
                {saveData?.map((house, i) => {
                    return (
                        <li
                            key={i}
                            className="lg:max-w-lg bg-lime-700 px-6 py-3 mt-6 drop-shadow-2xl rounded-lg space-y-4 border-b-2 border-lime-1000"
                        >
                            <h3
                                className="font-bold text-lime-400"
                            >
                                House #{i + 1}
                            </h3>
                            <p>{house.fields.btuPerHr} Btu/Hr</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
