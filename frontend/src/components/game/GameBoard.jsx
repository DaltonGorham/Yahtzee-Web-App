import { useEffect, useState } from 'react'
import {startNewGame, rollAll, reroll, chooseScore, score} from "../../api.js";
import DiceTray from "../dice/DiceTray.jsx";
import ScoreOptions from "./Scoring.jsx";
import GameOverScreen from "./GameOver.jsx";
import './GameBoard.css';

export default function GameBoard() {
    const [gameState, setGameState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [isRolling, setIsRolling] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    // Initialize game on component mount
    useEffect(() => {
        handleNewGame();
    }, []);

    useEffect(() => {
        if (gameState && gameState?.gameActive === false) {
            setFinalScore(gameState?.totalScore || 0);
            setGameOver(true);
        }
    }, [gameState]);

    const handleNewGame = async () => {
        setLoading(true);
        try {
            const data = await startNewGame();
            setGameState(data);
            setSelectedIndices([]);
            setGameOver(false);
        } catch (err) {
            console.error('Failed to start new game:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRollAll = async () => {
        setIsRolling(true);

        try {
            const data = await rollAll();
            setGameState(data);
            setSelectedIndices([]);

            // Keep animation running for full duration
            setTimeout(() => {
                setIsRolling(false);
            }, 1200); // Total animation time
        } catch (error) {
            console.error("Roll all failed:", error);
            setIsRolling(false);
        }
    };

    const handleReroll = async () => {
        if (selectedIndices.length === 0) return;

        setIsRolling(true);

        try {
            const data = await reroll(selectedIndices);
            setGameState(data);
            setSelectedIndices([]);

            // Keep animation running for full duration
            setTimeout(() => {
                setIsRolling(false);
            }, 1200); // Total animation time
        } catch (error) {
            console.error("Reroll failed:", error);
            alert("Reroll failed. Please try again.");
            setIsRolling(false);
        }
    };

    const dice = gameState?.dice?.map((value, index) => ({
        value,
        isHeld: selectedIndices.includes(index)
    })) || [];

    const toggleHold = index => {
        // Don't allow holding during animation
        if (isRolling) return;

        setSelectedIndices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const handleChooseScore = async () => {
        try {
            const updateGameState = await chooseScore();
            setGameState(updateGameState);
        }catch(error) {
            console.error("Error choosing score:", error);
        }
    }

    const handleScoreSelection = async (category) => {
        try {
            const updatedGameState = await score(category);
            setGameState(updatedGameState);
            setSelectedIndices([]);
        } catch (err) {
            console.error("Error scoring category:", err);
        }
    };

    if (loading || !gameState) {
        return <div className="loading">Loading...</div>;
    }

    const maxRounds = 13;

    return (
        <section className="game-board-container">
            {gameOver && (
                <GameOverScreen
                    finalScore={finalScore}
                    scorecard={gameState?.scorecard || {}}
                    onNewGame={handleNewGame}
                />
            )}
            <div className="game-header">
                <div className="title-container">
                    <h1>🎲 Yahtzee!</h1>
                </div>

                <div className="game-info-panel">
                    <div className="score-display-card">
                        <div className="score-main">
                            <span className="score-label">Total Score</span>
                            <span className="score-value">{gameState?.totalScore || 0}</span>
                        </div>
                    </div>

                    <div className="round-display-card">
                        <div className="round-main">
                            <span className="round-label">Round</span>
                            <span className="round-value">{gameState?.currentRound || 1}</span>
                            <span className="round-total">/ {maxRounds}</span>
                        </div>
                        <div className="round-progress">
                            <div
                                className="round-progress-bar"
                                style={{
                                    width: `${((gameState?.currentRound || 1) / maxRounds) * 100}%`
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="turn-display-card">
                        <div className="turn-main">
                            <span className="turn-label">Rolls Left</span>
                            <span className="turn-value">{gameState?.rollsRemaining ?? 0}</span>
                        </div>
                        <div className="roll-indicators">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`roll-dot ${i < (gameState?.rollsRemaining ?? 0) ? 'active' : 'used'}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <DiceTray
                dice={dice}
                toggleHold={toggleHold}
                isRolling={isRolling}
            />

            <div className="game-controls-bar">
                <div className="combination-info">
                    <span className="combination-label">Current Combination:</span>
                    <span className="combination-value">{gameState?.combination || 'None'}</span>
                </div>

                <div className="control-actions">
                    <button
                        className="btn btn-primary"
                        onClick={handleRollAll}
                        disabled={(gameState?.rollsRemaining ?? 0) <= 0 || isRolling || !gameState}
                    >
                        {isRolling ? 'Rolling...' : 'Roll All Dice'}
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={handleReroll}
                        disabled={(gameState?.rollsRemaining ?? 0) <= 0 || selectedIndices.length === 0 || isRolling || !gameState}
                        title={selectedIndices.length === 0 ? "Select dice to re-roll" : ""}
                    >
                        {isRolling && selectedIndices.length > 0
                            ? 'Rolling...'
                            : `Re-roll Selected (${selectedIndices.length})`
                        }
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={handleChooseScore}
                        disabled={isRolling || gameState?.waitingForScore}
                        title={gameState?.waitingForScore ? "Already in scoring mode" : ""}
                    >
                        Score
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={handleNewGame}
                        disabled={isRolling}
                    >
                        New Game
                    </button>
                </div>

                <div className="status-info">
                    <span className="status-text">
                        {(gameState?.rollsRemaining ?? 0) > 0 && !isRolling && (
                            selectedIndices.length > 0
                                ? `${selectedIndices.length} dice selected for re-roll`
                                : "Click dice to select them for re-rolling"
                        )}
                        {(gameState?.rollsRemaining ?? 0) === 0 && !isRolling && (
                            "No rolls remaining - choose a category to score!"
                        )}
                        {isRolling && (
                            "🎲 Rolling dice..."
                        )}
                    </span>
                </div>
            </div>

            <div className="game-scoring-section">
                <ScoreOptions
                    possibleScores={gameState?.possibleScores || []}
                    onSelectCategory={handleScoreSelection}
                    scorecard={gameState?.scorecard || []}
                />
            </div>
        </section>
    );
}