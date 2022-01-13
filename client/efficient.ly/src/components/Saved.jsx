import { useEffect, useState } from "react";
import api from "../services/apiConfig";
import LoadingPage from "./LoadingPage";

export default function Saved() {
    const [saveData, setSaveData] = useState([]);

    useEffect(() => {
        console.log(saveData);
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
            <h2>Saved Data:</h2>
            <ul>
                {saveData?.map((house, i) => {
                    return (
                        <li key={i}>
                            <h3>House #{i + 1}</h3>
                            {Object.keys(house.fields).map((key, j) => {
                                return (
                                    <p key={j}>{key}: {house.fields[key]}</p>
                                )
                            })}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
