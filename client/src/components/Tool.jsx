import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/apiConfig";

export default function Tool() {
    const default_input = {                     // UNITS:
        "climateZone": 3,                       // no units
        "framingRValue": 0.910,                 // R
        "insulationRValue": 4,                  // R
        "studDepth": 3.5,                       // in.
        "studWidth": 1.5,                       // in.
        "studSpacing": 16,                      // in.
        "exteriorWallInsulationThickness": 0,   // in.
        "interiorWallInsulationThickness": 0,   // in.
        "rafterDepth": 11.25,                   // in.
        "rafterWidth": 1.5,                     // in.
        "rafterSpacing": 48,                    // in.
        "exteriorRoofInsulationThickness": 0,   // in.
        "interiorRoofInsulationThickness": 0,   // in.
        "roofPitch": 45,                        // deg.
        "joistDepth": 5.5,                      // in.
        "joistWidth": 1.5,                      // in.
        "joistSpacing": 16,                     // in.
        "houseWidth": 20,                       // ft.
        "houseLength": 40,                      // ft.
        "storyHeight": 14,                      // ft.
        "storyNum": 2,                          // no units
        "windowNum": 10,                        // no units
        "windowLength": 3,                      // ft.
        "windowWidth": 2,                       // ft.
        "windowRValue": 3,                      // R
        "indoorTempNight": 62,                  // degF
        "btuPerHr": 0,                          // Btu/hr
    };

    const [input, setInput] = useState(default_input);

    const handleNumberInput = (e) => {
        const { id, valueAsNumber } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [id]: valueAsNumber,
        }));
    }

    let result = 0;
    const calculate = () => {
        let worstCaseTemp = 0;      // degF
        if (input.climateZone === 1) {
            worstCaseTemp = 20;
        } else if (input.climateZone === 2) {
            worstCaseTemp = 10;
        } else if (input.climateZone === 3) {
            worstCaseTemp = 0;
        } else if (input.climateZone === 4) {
            worstCaseTemp = -10;
        } else if (input.climateZone === 5) {
            worstCaseTemp = -20;
        } else if (input.climateZone === 6) {
            worstCaseTemp = -30;
        } else if (input.climateZone === 7) {
            worstCaseTemp = -40;
        } else if (input.climateZone === 8) {
            worstCaseTemp = -60;
        }

        // Walls
        let height = input.storyHeight * input.storyNum;
        let wallSurfaceArea = 2 * ((input.houseLength + input.houseWidth) * height);
        let windowSurfaceArea = input.windowLength * input.windowWidth * input.windowNum;
        let avgWallRValue = (input.windowRValue * windowSurfaceArea + (wallSurfaceArea - windowSurfaceArea) * ((input.studDepth * ((input.studSpacing - input.studWidth) * input.insulationRValue + input.studWidth * input.framingRValue) / input.studSpacing) + (input.exteriorWallInsulationThickness + input.interiorWallInsulationThickness) * input.insulationRValue)) / wallSurfaceArea;
        let wallBtuPerHrF = wallSurfaceArea / avgWallRValue;
        
        // Roof
        let roofSurfaceArea = input.houseLength * (input.houseWidth / Math.cos(input.roofPitch * (Math.PI/180)));        
        let avgRoofRValue = ((input.rafterDepth * 0.69) * ((input.rafterSpacing - input.rafterWidth) * input.insulationRValue + input.rafterWidth * input.framingRValue) / input.rafterSpacing) + ((input.exteriorRoofInsulationThickness + input.interiorRoofInsulationThickness) * input.insulationRValue);
        let roofBtuPerHrF = roofSurfaceArea / avgRoofRValue;

        // Floor
        let floorSurfaceArea = input.houseLength * input.houseWidth;
        let avgFloorRValue = input.joistDepth * ((input.joistSpacing - input.joistWidth) * input.insulationRValue + input.joistWidth * input.framingRValue) / input.joistSpacing;
        let floorBtuPerHrF = floorSurfaceArea / avgFloorRValue;

        // Total
        let totalBtuPerHrF = wallBtuPerHrF + roofBtuPerHrF + floorBtuPerHrF;

        result = (Math.ceil(1.5 * totalBtuPerHrF * (input.indoorTempNight - worstCaseTemp)));
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        calculate();
        setInput((prevInput) => ({
            ...prevInput,
            "btuPerHr": result,
        }));
    };

    const saveData = async () => {
        const fields = input;
        await api.post("heatingData", { fields });
    }

    const resetTool = () => {
        setInput(default_input);
    }

    return (
        <div className="flex flex-col items-center">
            <div>
                <h2 className="text-xl">Heating Load <span className="text-lime-700 font-bold">Calculator</span></h2>
                <p className="mt-4"
                >
                    Calculate the heating reqirements for your home in Btu per hour.
                    The result will be the total output needed from all heating systems
                    assuming a well sealed building envelope.
                    This includes a 50% load factor to ensure the system will run below capacity.
                </p>
                <p className="mt-2 text-sm text-lime-900"
                >
                    The default inputs represent common building specifications in the U.S.
                    If there is a field you are unsure about, you may leave it as the default.
                    However, the result will be more accurate if the tool is filled out completely.
                </p>
            </div>
            
            <Link 
                to={`/info/recBDqjgEjNLC6hEu`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 px-5 py-3 rounded-lg shadow-lg inline-block bg-lime-700 border-b-2 border-lime-1000
                text-lime-100 uppercase tracking-wider font-semibold text-sm
                hover:bg-lime-600 hover:-translate-y-0.5 transform transition
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-700 focus:ring-opacity-50
                active:bg-lime-800"
            >
                More Info
            </Link>
            
            <img 
                src="https://i.imgur.com/bbyL39P.png"
                alt="IRC 2018 U.S. Climate Zone Map"
                title="IRC 2018 U.S. Climate Zone Map"
                className="mt-4 max-h-70 rounded-sm drop-shadow-2xl
                sm:max-h-96"
            />

            <form
                id="toolForm"
                onSubmit={handleSubmit}
                className="bg-lime-700 px-6 py-6 mt-6 drop-shadow-2xl rounded-lg space-y-4 border-b-2 border-lime-1000
                grid grid-col-1"
            >
            
                <div>
                    <label htmlFor="climateZone">Climate Zone: </label>
                    <span
                        className="text-lime-400 bg-lime-900 rounded-lg px-1 py-1 border-b-2 border-lime-1000"
                        id="climateZoneOutput"
                    >
                        {input.climateZone}
                    </span>
                    <input
                        id="climateZone"
                        type="range"
                        name="range"
                        value={input.climateZone}
                        min="1"
                        max="8"
                        step="1"
                        onChange={handleNumberInput}
                        className="ml-2 appearance-none h-1 bg-lime-900 rounded-lg outline-none border-b-2 border-lime-1000 slider"
                    />
                </div>
                
                <div>
                    <label className="block" htmlFor="insulationRValue">Insulation R Value: </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="insulationRValue"
                        type="number"
                        min="0"
                        step="0.001"
                        value={input.insulationRValue}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="framingRValue">Framing R Value: </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="framingRValue"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.framingRValue}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="studDepth">Stud Depth (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="studDepth"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.studDepth}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="studWidth">Stud Width (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="studWidth"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.studWidth}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="studSpacing">Stud Spacing (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="studSpacing"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.studSpacing}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="exteriorWallInsulationThickness">Wall Exterior Insulation (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="exteriorWallInsulationThickness"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.exteriorWallInsulationThickness}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="interiorWallInsulationThickness">Wall Interior Insulation (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="interiorWallInsulationThickness"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.interiorWallInsulationThickness}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="rafterDepth">Rafter Depth (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="rafterDepth"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.rafterDepth}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="rafterWidth">Rafter Width (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="rafterWidth"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.rafterWidth}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="rafterSpacing">Rafter Spacing (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="rafterSpacing"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.rafterSpacing}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="exteriorRoofInsulationThickness">Roof Exterior Insulation (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="exteriorRoofInsulationThickness"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.exteriorRoofInsulationThickness}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="interiorRoofInsulationThickness">Roof Interior Insulation (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="interiorRoofInsulationThickness"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.interiorRoofInsulationThickness}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="roofPitch">Roof Pitch (Degrees): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="roofPitch"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.roofPitch}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="joistDepth">Floor Joist Depth (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="joistDepth"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.joistDepth}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="joistWidth">Floor Joist Depth (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="joistWidth"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.joistWidth}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="joistSpacing">Floor Joist Spacing (in): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="joistSpacing"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.joistSpacing}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="houseWidth">Width of House (ft): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="houseWidth"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.houseWidth}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="houseLength">Length of House (ft): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="houseLength"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.houseLength}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="storyHeight">Height of Each Story (ft): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="storyHeight"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.storyHeight}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="storyNum">Number of Stories: </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="storyNum"
                        type="number"
                        min="0"
                        step="1"
                        value={input.storyNum}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="windowNum">Number of Windows: </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="windowNum"
                        type="number"
                        min="0"
                        step="1"
                        value={input.windowNum}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="windowLength">Length of Windows (ft): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="windowLength"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.windowLength}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="windowWidth">Width of Windows (ft): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="windowWidth"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.windowWidth}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="windowRValue">Window R Value: </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="windowRValue"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.windowRValue}
                        onChange={handleNumberInput}
                    />
                </div>

                <div>
                    <label className="block" htmlFor="indoorTempNight">Nighttime Indoor Temperature (F): </label>
                    <input
                        className="text-lime-400 bg-lime-900 rounded-lg border-b-2 border-lime-1000"
                        id="indoorTempNight"
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.indoorTempNight}
                        onChange={handleNumberInput}
                    />
                </div>

                <button
                    className="px-5 py-3 rounded-lg shadow-lg inline-block bg-lime-400 border-b-2 border-lime-1000
                    text-lime-900 uppercase tracking-wider font-semibold text-sm
                    hover:bg-lime-300 hover:-translate-y-0.5 transform transition
                    focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-400 focus:ring-opacity-50
                    active:bg-lime-500"
                >
                    Calculate
                </button>

                <div className="font-semibold uppercase tracking-wider text-md">
                    <p className="text-lime-400">Heating Load: </p>
                    <p className="text-lime-100">{input.btuPerHr} Btu/hr</p>
                </div>
            </form>

            <div className="m-4 space-x-2">
                <button
                    onClick={saveData}
                    className="px-5 py-3 rounded-lg shadow-lg inline-block bg-lime-700 border-b-2 border-lime-1000
                    text-lime-100 uppercase tracking-wider font-semibold text-sm
                    hover:bg-lime-600 hover:-translate-y-0.5 transform transition
                    focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-700 focus:ring-opacity-50
                    active:bg-lime-800"
                >
                    Save Data
                </button>

                <button
                    onClick={resetTool}
                    className="px-5 py-3 rounded-lg inline-block bg-gray-300
                    text-lime-1000 uppercase tracking-wider font-semibold text-sm border-b-2 border-lime-1000
                    hover:bg-gray-200
                    focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-300 focus:ring-opacity-50
                    active:bg-gray-400"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}
