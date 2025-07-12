import { useEffect, useState } from 'react'
import { startNewGame, rollAll, reroll} from "../../api.js";


export default function Die() {
    const [gameState, setGameState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedIndices, setSelectedIndices] = useState([]);


    useEffect(() => {
        startNewGame().then(setGameState).finally(() => setLoading(false))
    }, []);

    const handleRollAll = () => {
        rollAll().then(setGameState);
    }

    const handleReroll = () => {
        if (selectedIndices.length === 0) return;

        reroll(selectedIndices)
            .then(data => {
                setGameState(data);
                setSelectedIndices([]);
            })
            .catch(error => {
                console.error("Reroll failed:", error);
                alert("Reroll failed. Please try again.");
            });
    };

    if (loading || !gameState) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Yahtzee!</h1>
            <div>
                {gameState?.dice?.map((val, idx) => (
                    <button
                        key={idx}
                        style={{
                            margin: '10px',
                            fontSize: '2rem',
                            backgroundColor: selectedIndices.includes(idx) ? 'lightgreen' : 'blue'
                        }}
                        onClick={() => {
                            setSelectedIndices(prev =>
                                prev.includes(idx)
                                    ? prev.filter(i => i !== idx)
                                    : [...prev, idx]
                            );
                        }}
                    >
                        {val}
                    </button>
                ))}
            </div>
            {gameState?.rollsRemaining ? '' : <p>Game Over!</p>}
            <p>Combination: {gameState?.combination || 'Loading...'}</p>
            <p>Rolls Remaining: {gameState?.rollsRemaining ?? 'Loading...'}</p>
            <button onClick={handleRollAll} disabled={!gameState}>Roll All</button>
            <button onClick={handleReroll} disabled={!gameState}>Re-Roll</button>
        </div>
    );
}