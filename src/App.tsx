import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST } from './consts';
import AttributesManager from './AttributesManager';
import SkillsManager from './SkillsManager';

const MAX_POINTS = 70;

function App() {
    // state for attr, init 10
    const [attributes, setAttributes] = useState<Record<string, number>>(
        Object.fromEntries(ATTRIBUTE_LIST.map(attr => [attr, 10]))
    );

    //calculate attribute total
    const getTotalPoints = () => {
        return Object.values(attributes).reduce((sum, value) => sum + value, 0);
    };

    //attribute adjust
    const handleAttributeChange = (attribute: string, newVal: number) => {
        const diff = newVal - attributes[attribute];
        const newTotal = getTotalPoints() + diff;

        if(newVal >= 0 && newTotal <= MAX_POINTS){
            setAttributes(prev => ({
                ...prev,
                [attribute]: newVal
            }));
        }
    };

    const totalPoints = getTotalPoints();
  
    return (
        <div className="App">
            <header className="App-header">
                <p>Character Sheet</p>
            </header>
            <p>Total points used: {totalPoints} / {MAX_POINTS}</p>
            <section className="App-section">
                <AttributesManager attributes={attributes} onAttributeChange={handleAttributeChange}></AttributesManager>
                <SkillsManager attributes={attributes} />
            </section>
        </div>
    );
}

export default App;
