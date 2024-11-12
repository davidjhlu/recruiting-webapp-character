import React, { useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST } from './consts';
import './App.css';

interface AttributesProps {
    attributes: Record<string, number>;
    onAttributeChange: (attribute: string, value: number) => void;
}

const AttributesManager: React.FC<AttributesProps> = ({
    attributes,
    onAttributeChange
}) => {

    //class state
    const [selectedClass, setSelectedClass] = useState<string | null>();

    //increment att
    const incrementAttribute = (attribute: string) => {
        onAttributeChange(attribute, attributes[attribute] + 1);
    }

    //decrement att
    const decrementAttribute = (attribute: string) => {
        onAttributeChange(attribute, attributes[attribute] - 1);
    }

    //class 
    const classRequirements = (className: string) => {
        const req = CLASS_LIST[className as keyof typeof CLASS_LIST];
        return Object.entries(req).every(
            ([attribute, minVal]) => attributes[attribute] >= minVal
        );
    }


    return (
        <>
            <section className="App-section">
                <div>
                    {ATTRIBUTE_LIST.map((attribute) => (
                        <div key={attribute}>
                            <h3>{attribute}</h3>
                            <div>
                                <button onClick={() => decrementAttribute(attribute)}>-</button>
                                <button onClick={() => incrementAttribute(attribute)}>+</button>
                                <span>&nbsp; {attributes[attribute]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div>
                {Object.keys(CLASS_LIST).map((className) => (
                    <div 
                    key={className} 
                    className={` classStatus ${classRequirements(className) ? 'eligible' : ''}`}
                    onClick={() => setSelectedClass(className)}
                    style={{ cursor: 'pointer' }}
                    >
                    <h3>{className}</h3>
                    </div>
                ))}
            </div>
            {selectedClass && (
                <div>
                    <h2>{selectedClass} requirements</h2>
                    <div>
                        {Object.entries(CLASS_LIST[selectedClass]).map(([attribute, minVal]: [string, number]) => (
                            <p key={attribute}> {attribute}: {minVal}</p>
                        ))}
                    </div>
                </div>
            )}

        </>
    );
    
};

export default AttributesManager;