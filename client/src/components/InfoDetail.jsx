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
            setInfo(res.data);
        };
        fetchInfo();
    }, []);

    if (!info.fields) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className="text-xl">
                Learn About Efficient <span className="text-lime-700 font-bold">{info.fields?.category}</span>
            </h2>
            
            <p className="mt-6">{info.fields?.firstParagraph}</p>
            <img className="rounded-xl" src={info.fields?.imgSrc1} alt={info.fields?.imgAlt1}/>

            <p className="mt-6">{info.fields?.secondParagraph}</p>
            <img className="rounded-xl" src={info.fields?.imgSrc2} alt={info.fields?.imgAlt2}/>

            <p className="mt-6">{info.fields?.thirdParagraph}</p>
            <img className="rounded-xl" src={info.fields?.imgSrc3} alt={info.fields?.imgAlt3}/>
        </div>
    )
}
