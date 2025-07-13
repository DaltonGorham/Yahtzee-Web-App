import React from 'react';
import './Controls.css';

const Controls = ({
                      onRollAll,
                      onReroll,
                      onNewGame,
                      onChooseScore,
                      rollsRemaining,
                      combination,
                      gameState,
                      selectedIndices = [],
                      isRolling = false
                  }) => {
    const hasSelectedDice = selectedIndices.length > 0;
    const canRoll = rollsRemaining > 0 && !isRolling;

    return (
        <div className="controls-container">
            {/* Game Status Section */}
            <div className="game-status">
                <div className="status-item">
                    <span className="status-label">Rolls Remaining:</span>
                    <span className={`status-value ${rollsRemaining <= 1 ? 'warning' : ''}`}>
                        {rollsRemaining}
                    </span>
                </div>
                <div className="status-item">
                    <span className="status-label">Current Combination:</span>
                    <span className="status-value combination">
                        {combination || 'None'}
                    </span>
                </div>
            </div>

            {/* Action Buttons Section */}
            <div className="action-buttons">
                <button
                    className="btn btn-primary"
                    onClick={onRollAll}
                    disabled={!canRoll || !gameState}
                >
                    {isRolling ? 'Rolling...' : 'Roll All Dice'}
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={onReroll}
                    disabled={!canRoll || !hasSelectedDice || !gameState}
                    title={!hasSelectedDice ? "Select dice to re-roll" : ""}
                >
                    {isRolling && hasSelectedDice
                        ? 'Rolling...'
                        : `Re-roll Selected (${selectedIndices.length})`
                    }
                </button>

                <button
                    className="btn btn-score"
                    onClick={onChooseScore}
                    disabled={isRolling || gameState?.waitingForScore}
                    title={gameState?.waitingForScore ? "Already in scoring mode" : ""}
                >
                    Score
                </button>

                <button
                    className="btn btn-outline"
                    onClick={onNewGame}
                    disabled={isRolling}
                >
                    New Game
                </button>
            </div>

            {/* Helper Text */}
            <div className="helper-text">
                {canRoll && !isRolling && (
                    <p>
                        {hasSelectedDice
                            ? `${selectedIndices.length} dice selected for re-roll`
                            : "Click dice to select them for re-rolling"
                        }
                    </p>
                )}
                {rollsRemaining === 0 && !isRolling && (
                    <p>No rolls remaining - choose a category to score!</p>
                )}
                {isRolling && (
                    <p>🎲 Rolling dice...</p>
                )}
            </div>
        </div>
    );
};

export default Controls;