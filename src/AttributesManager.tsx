import React, { useState } from 'react';
import { ATTRIBUTE_LIST } from './consts';
import './App.css';

interface AttributesProps {
    attributes: Record<string, number>;
    onAttributeChange: (attribute: string, value: number) => void;
}

const AttributesManager: React.FC<AttributesProps> = ({
    attributes,
    onAttributeChange
}) => {

    //increment att
    const incrementAttribute = (attribute: string) => {
        onAttributeChange(attribute, attributes[attribute] + 1);
    }

    //decrement att
    const decrementAttribute = (attribute: string) => {
        onAttributeChange(attribute, attributes[attribute] - 1);
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
        </>
    );
    
};

export default AttributesManager;