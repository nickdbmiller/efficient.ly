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
            <h2>Learn About Efficient {info.fields?.category}</h2>
            
            <p>{info.fields?.firstParagraph}</p>
            <img src={info.fields?.imgSrc1} alt={info.fields?.imgAlt1}/>

            <p>{info.fields?.secondParagraph}</p>
            <img src={info.fields?.imgSrc2} alt={info.fields?.imgAlt2}/>

            <p>{info.fields?.thirdParagraph}</p>
            <img src={info.fields?.imgSrc3} alt={info.fields?.imgAlt3}/>
        </div>
    )
}
