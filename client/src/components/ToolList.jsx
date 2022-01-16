import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/apiConfig";

import LoadingPage from "./LoadingPage";

export default function ToolList() {
    const [toolData, setToolData] = useState([]);

    useEffect(() => {
        const fetchTools = async() => {
            const res = await api.get('tools');
            setToolData(res.data.records);
        };
        fetchTools();
    }, []);

    if (toolData.length === 0) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className="text-xl">Choose a <span className="text-lime-700 font-bold">tool</span>:</h2>
            <ul className="text-center bg-lime-700 px-6 pt-6 m-6 drop-shadow-2xl rounded-lg">
                {toolData.map((tool) => {
                    return (
                        <li key={tool.id}>
                            <Link to={`/tools/${tool?.fields.toolName}`}>
                                <h3
                                    className="font-bold text-lime-400 hover:text-lime-300 hover:-translate-y-0.5 transform transition
                                    focus:outline-none focus:ring focus:ring-lime-400 focus:ring-opacity-50
                                    active:text-lime-500"
                                >
                                    {`${tool?.fields.toolUpperCase}`}
                                </h3>
                            </Link>
                            <br/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
