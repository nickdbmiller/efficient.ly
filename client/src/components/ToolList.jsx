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
            <h2>Choose a tool:</h2>
            <ul>
                {toolData.map((tool) => {
                    return (
                        <li key={tool.id}>
                            <Link to={`/tools/${tool?.fields.toolName}`}>
                                <h3>{`${tool?.fields.toolUpperCase}`}</h3>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
