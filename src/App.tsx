import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST } from './consts';
import AttributesManager from './AttributesManager';
import SkillsManager from './SkillsManager';

const MAX_POINTS = 70;
const API_BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api';
const GITHUB_USER = 'davidjhlu';

interface CharacterData {
    attributes: Record<string, number>;
    skillPoints: Record<string, number>;
}

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    //state for attr, init 10
    const [attributes, setAttributes] = useState<Record<string, number>>(
        Object.fromEntries(ATTRIBUTE_LIST.map(attr => [attr, 10]))
    );

    //state for skill points
    // not working***********************************************
    const [skillPoints, setSkillPoints] = useState<Record<string, number>>();

    const saveCharacter = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/${GITHUB_USER}/character`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attributes,
                    skillPoints
                }),
            });
            setError(null);
        } catch (err) {
            setError('Failed to save character');
            console.error('Error saving character:', err);
        } finally {
            setLoading(false);
        }
    };


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
                <button onClick={saveCharacter} className="save-button"> Save Character</button>
            </section>
            
        </div>
    );
}

export default App;
