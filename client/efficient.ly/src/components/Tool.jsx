import { useState } from "react";

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

    return (
        <div>
            <h2>Heating Load Calculator</h2>
            <p>Calculate the heating reqirements for your house. The tool will calculate the size of your heating system in Btu per hour. If there is a field you are unsure about you can leave it as the default, but the more accurately you fill out the tool, the more accurate your result will be.</p>
            <button>Information on Efficient Heating Systems</button>
            <form
                id="toolForm"
                onSubmit={handleSubmit}
            >
            
                <label htmlFor="climateZone">Choose your climate zone:</label>
                <input
                    id="climateZone"
                    type="range"
                    name="range"
                    value={input.climateZone}
                    min="1"
                    max="8"
                    step="1"
                    onChange={handleNumberInput}
                />
                <span id="climateZoneOutput">{input.climateZone}</span>
                
                <label htmlFor="insulationRValue">Input Insulation R Value:</label>
                <input
                    id="insulationRValue"
                    type="number"
                    min="0"
                    step="0.001"
                    value={input.insulationRValue}
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
                <p>Heating Load: {input.btuPerHr} Btu per hour</p>
            </form>
            <button>Save</button>
        </div>
    )
}
