import React from 'react';
import Die from './Die';
import './DiceTray.css';

const DiceTray = ({ dice = [], toggleHold, isRolling = false }) => {
    const trayClasses = [
        'dice-tray',
        isRolling ? 'rolling' : ''
    ].filter(Boolean).join(' ');

    return (
        <div className="dice-tray-container">
            <h2>Dice</h2>
            <div className={trayClasses}>
                {dice.map((die, index) => (
                    <Die
                        key={index}
                        value={die.value}
                        isHeld={die.isHeld}
                        isRolling={isRolling && !die.isHeld} // Only animate dice that aren't held
                        onClick={() => toggleHold(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DiceTray;