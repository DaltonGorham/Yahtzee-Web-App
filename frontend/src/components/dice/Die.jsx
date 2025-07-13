import React, { useState, useEffect } from 'react';
import './Die.css';

const Die = ({ value, isHeld, onClick, isRolling = false }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLanding, setIsLanding] = useState(false);

    const getDotPattern = (value) => {
        const patterns = {
            1: [4], // center dot
            2: [0, 8], // top-left, bottom-right
            3: [0, 4, 8], // top-left, center, bottom-right
            4: [0, 2, 6, 8], // corners
            5: [0, 2, 4, 6, 8], // corners + center
            6: [0, 2, 3, 5, 6, 8] // two columns
        };
        return patterns[value] || [];
    };

    useEffect(() => {
        if (isRolling) {
            setIsAnimating(true);
            setIsLanding(false);

            // Stop rolling animation after duration
            const rollTimer = setTimeout(() => {
                setIsAnimating(false);
                setIsLanding(true);

                // Stop landing animation
                const landTimer = setTimeout(() => {
                    setIsLanding(false);
                }, 400);

                return () => clearTimeout(landTimer);
            }, 800);

            return () => clearTimeout(rollTimer);
        }
    }, [isRolling]);

    const dieClasses = [
        'die',
        isHeld ? 'held' : '',
        isAnimating ? 'rolling' : '',
        isLanding ? 'landing' : ''
    ].filter(Boolean).join(' ');

    return (
        <div
            className={dieClasses}
            onClick={!isAnimating ? onClick : undefined} // Disable clicking during animation
        >
            {Array.from({ length: 9 }, (_, index) => (
                <div
                    key={index}
                    className={`die-dot ${getDotPattern(value).includes(index) ? 'visible' : 'hidden'}`}
                />
            ))}
        </div>
    );
};

export default Die;