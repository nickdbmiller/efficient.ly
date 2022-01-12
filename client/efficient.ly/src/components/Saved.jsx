import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/apiConfig";

export default function Saved() {
    const [saveData, setSaveData] = useState([]);

    useEffect(() => {
        const fetchSaveData = async() => {
            const res = await api.get('heatingData');
            console.log(res);
            setSaveData(res.data.records);
        };
        fetchSaveData();
    }, []);

    return (
        <div>
            <h2>Saved Data:</h2>
            <ul>
                {saveData.map((house) => {
                    return (
                        <li key={house.id}>
                                <h3>{`${house?.fields.climateZone}`}</h3>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
