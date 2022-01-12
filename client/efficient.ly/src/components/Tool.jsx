import { useState } from "react";

export default function Tool() {
    const default_input = {
        "climateZone": 3,
        "framingRValue": 0.91,
        "rValue": 4,
        "studDepth": 3.5,
        "studWidth": 1.5,
        "studSpacing": 16,
        "exteriorWallInsulationThickness": 0,
        "interiorWallInsulationThickness": 0,
        "rafterDepth": 11.25,
        "rafterWidth": 1.5,
        "rafterSpacing": 48,
        "exteriorRoofInsulationThickness": 0,
        "interiorRoofInsulationThickness": 0,
        "roofPitch": 45,
        "joistDepth": 5.5,
        "joistWidth": 1.5,
        "joistSpacing": 16,
        "houseWidth": 20,
        "houseLength": 40,
        "storyHeight": 14,
        "storyNum": 1,
        "windowNum": 10,
        "windowLength": 3,
        "windowWidth": 2,
        "windowRValue": 3,
        "indoorTempNight": 62,
        "btuPerHr": 0,
    };

    const [input, setInput] = useState(default_input);
    const [result, setResult] = useState(0);

    const handleSlider = (e) => {
        const { id, valueAsNumber } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [id]: valueAsNumber,
        }))
    }

    const handleNumberInput = (e) => {
        const { id, valueAsNumber } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [id]: valueAsNumber,
        }));
    }

    const handleCalcs = async (e) => {
        e.preventDefault();
        setResult(input.climateZone*input.wallThickness)
    };

    return (
        <div>
            <h2>Tool Title</h2>
            <p>Tool Desciption</p>
            <form
                id="toolForm"
                onSubmit={handleCalcs}
            >
            
                <label htmlFor="climateZone">Choose your climate zone:</label>
                <input
                    id="climateZone"
                    type="range"
                    name="range"
                    value={input.climateZone}
                    min="1"
                    max="6"
                    step="1"
                    onChange={handleSlider}
                />
                <span id="climateZoneOutput">{input.climateZone}</span>
                
                <label htmlFor="rValue">Input Insulation R Value:</label>
                <input
                    id="rValue"
                    type="number"
                    min="0"
                    step="0.001"
                    value={input.rValue}
                    onChange={handleNumberInput}
                />

                <label htmlFor="framingRValue">Input R Value of Framing:</label>
                <input
                    id="framingRValue"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.framingRValue}
                    onChange={handleNumberInput}
                />

                <label htmlFor="studDepth">Input Wall Stud Depth:</label>
                <input
                    id="studDepth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.studDepth}
                    onChange={handleNumberInput}
                />

                <label htmlFor="studWidth">Input Wall Stud Width:</label>
                <input
                    id="studWidth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.studWidth}
                    onChange={handleNumberInput}
                />

                <label htmlFor="studSpacing">Input Wall Stud Spacing:</label>
                <input
                    id="studSpacing"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.studSpacing}
                    onChange={handleNumberInput}
                />

                <label htmlFor="exteriorWallInsulationThickness">Input Wall Exterior Insulation Thickness:</label>
                <input
                    id="exteriorWallInsulationThickness"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.exteriorWallInsulationThickness}
                    onChange={handleNumberInput}
                />

                <label htmlFor="interiorWallInsulationThickness">Input Wall Interior Insulation Thickness:</label>
                <input
                    id="interiorWallInsulationThickness"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.interiorWallInsulationThickness}
                    onChange={handleNumberInput}
                />

                <label htmlFor="rafterDepth">Input Rafter Depth:</label>
                <input
                    id="rafterDepth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.rafterDepth}
                    onChange={handleNumberInput}
                />

                <label htmlFor="rafterWidth">Input Rafter Width:</label>
                <input
                    id="rafterWidth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.rafterWidth}
                    onChange={handleNumberInput}
                />

                <label htmlFor="rafterSpacing">Input Rafter Spacing:</label>
                <input
                    id="rafterSpacing"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.rafterSpacing}
                    onChange={handleNumberInput}
                />

                <label htmlFor="exteriorRoofInsulationThickness">Input Roof Exterior Insulation Thickness:</label>
                <input
                    id="exteriorRoofInsulationThickness"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.exteriorRoofInsulationThickness}
                    onChange={handleNumberInput}
                />

                <label htmlFor="interiorRoofInsulationThickness">Input Roof Interior Insulation Thickness:</label>
                <input
                    id="interiorRoofInsulationThickness"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.interiorRoofInsulationThickness}
                    onChange={handleNumberInput}
                />

                <label htmlFor="roofPitch">Input Roof Pitch:</label>
                <input
                    id="roofPitch"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.roofPitch}
                    onChange={handleNumberInput}
                />

                <label htmlFor="joistDepth">Input Floor Joist Depth:</label>
                <input
                    id="joistDepth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.joistDepth}
                    onChange={handleNumberInput}
                />

                <label htmlFor="joistWidth">Input Floor Joist Depth:</label>
                <input
                    id="joistWidth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.joistWidth}
                    onChange={handleNumberInput}
                />

                <label htmlFor="joistSpacing">Input Floor Joist Spacing:</label>
                <input
                    id="joistSpacing"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.joistSpacing}
                    onChange={handleNumberInput}
                />

                <label htmlFor="houseWidth">Input Width of House:</label>
                <input
                    id="houseWidth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.houseWidth}
                    onChange={handleNumberInput}
                />

                <label htmlFor="houseLength">Input Length of House:</label>
                <input
                    id="houseLength"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.houseLength}
                    onChange={handleNumberInput}
                />

                <label htmlFor="storyHeight">Input Height of Stories:</label>
                <input
                    id="storyHeight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.storyHeight}
                    onChange={handleNumberInput}
                />

                <label htmlFor="storyNum">Input Number of Stories:</label>
                <input
                    id="storyNum"
                    type="number"
                    min="0"
                    step="1"
                    value={input.storyNum}
                    onChange={handleNumberInput}
                />

                <label htmlFor="windowNum">Input Number of Windows:</label>
                <input
                    id="windowNum"
                    type="number"
                    min="0"
                    step="1"
                    value={input.windowNum}
                    onChange={handleNumberInput}
                />

                <label htmlFor="windowLength">Input Length of Windows:</label>
                <input
                    id="windowLength"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.windowLength}
                    onChange={handleNumberInput}
                />

                <label htmlFor="windowWidth">Input Width of Windows:</label>
                <input
                    id="windowWidth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.windowWidth}
                    onChange={handleNumberInput}
                />

                <label htmlFor="windowRValue">Input Wall Interior Insulation Thickness:</label>
                <input
                    id="windowRValue"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.windowRValue}
                    onChange={handleNumberInput}
                />

                <label htmlFor="indoorTempNight">What is the coldest you ever want your house to get at night?:</label>
                <input
                    id="indoorTempNight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={input.indoorTempNight}
                    onChange={handleNumberInput}
                />

                <button>Calculate</button>
                <p>Heating Load: {result} Btu per hour</p>
            </form>
            <button>Information</button>
        </div>
    )
}
