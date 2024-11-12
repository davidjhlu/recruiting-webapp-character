import { useState } from 'react';
import { SKILL_LIST } from './consts';

const SkillsManager = ({ attributes }) => {
    //modifiers
    const getModifiers = () => {
        return Object.fromEntries(
            Object.entries(attributes).map(([attr, value]: [string, number]) => {
                const mod = Math.floor((value - 10)/2);
                return [attr, mod];
            })
        )
    };

    //skill points avail
    const getSkillPointsAvail = () => {
        const intMod = getModifiers()['Intelligence'];
        return Math.max(0, 10 + (4 * intMod)); //min 0
    };

    //points per skill
    const [skillPoints, setSkillPoints] = useState(
        Object.fromEntries(SKILL_LIST.map(skill => [skill.name, 0]))
    );

    //total points spent
    const getPointsSpent = () => {
        return Object.values(skillPoints).reduce((sum, points) => sum + points, 0);
    };

    //total skill values, points + mod
    const calcSkillTotal = (skillName) => {
        const skill = SKILL_LIST.find(s => s.name === skillName);
        const points = skillPoints[skillName];
        const mod = getModifiers()[skill.attributeModifier];
        return points + mod;
    }

    //adjust skill points
    const adjustSkillPoints = (skillName, amount) => {
        const newTotal = getPointsSpent() + amount;
        const newPoints = skillPoints[skillName] + amount;

        if(newPoints < 0 || newTotal > getSkillPointsAvail()) return;

        setSkillPoints(prev => ({
            ...prev,
            [skillName]: newPoints
        }));
    }

    const modifiers = getModifiers();
    const totalPoints = getSkillPointsAvail();
    const totalPointsSpent = getPointsSpent();

    return(
        <div>
            <h2>Skills</h2>
            <p>Points Available: {totalPoints} </p>
            <p>Points Remaining: {totalPoints - totalPointsSpent}</p>

            {SKILL_LIST.map(skill => (
                <div key={skill.name} className="skill-row">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-adjust">
                        <span>points: {skillPoints[skill.name]}</span>
                        <button onClick={() => adjustSkillPoints(skill.name, -1)} disabled={skillPoints[skill.name] <= 0}>-</button>
                        <button onClick={() => adjustSkillPoints(skill.name, 1)} disabled={totalPointsSpent >= totalPoints}>+</button>

                        <span className="skill-mod">mod:({skill.attributeModifier}): {modifiers[skill.attributeModifier]}</span>
                        <span>total: {calcSkillTotal(skill.name)} </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkillsManager;