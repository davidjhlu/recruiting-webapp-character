import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST } from './consts';
import AttributesManager from './AttributesManager';
import SkillsManager from './SkillsManager';


function App() {
    // state for attr, init 10
    const [attributes, setAttributes] = useState<Record<string, number>>(
        Object.fromEntries(ATTRIBUTE_LIST.map(attr => [attr, 10]))
    );

    //attribute adjust
    const handleAttributeChange = (attribute: string, newVal: number) => {
        if(newVal >= 0){
            setAttributes(prev => ({
                ...prev,
                [attribute]: newVal
            }));
        }
    };

    
  
    return (
        <div className="App">
            <header className="App-header">
                <p>Character Sheet</p>
            </header>
            <section className="App-section">
                <AttributesManager attributes={attributes} onAttributeChange={handleAttributeChange}></AttributesManager>
                <SkillsManager attributes={attributes} />
            </section>
        </div>
    );
}

export default App;
