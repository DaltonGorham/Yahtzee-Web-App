import React from 'react';
import './GameOver.css';

const GameOverScreen = ({ finalScore, scorecard, onNewGame }) => {
    // Calculate bonus and totals
    const upperSectionTotal = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes']
        .reduce((sum, category) => sum + (scorecard[category] || 0), 0);

    const upperBonus = upperSectionTotal >= 63 ? 35 : 0;
    const upperTotal = upperSectionTotal + upperBonus;

    const lowerSectionTotal = ['three-of-a-kind', 'four-of-a-kind', 'full-house',
        'small-straight', 'large-straight', 'yahtzee', 'chance']
        .reduce((sum, category) => sum + (scorecard[category] || 0), 0);

    return (
        <div className="game-over-overlay">
            <div className="game-over-container">
                <div className="game-over-header">
                    <h1 className="game-over-title">🎲 GAME OVER! 🎲</h1>
                    <div className="final-score-badge">
                        <span className="final-score-label">Final Score</span>
                        <span className="final-score-value">{finalScore}</span>
                    </div>
                </div>

                <div className="score-breakdown">
                    <div className="breakdown-section">
                        <h3>Upper Section</h3>
                        <div className="breakdown-row">
                            <span>Ones through Sixes:</span>
                            <span>{upperSectionTotal}</span>
                        </div>
                        <div className="breakdown-row bonus-row">
                            <span>Bonus (35 if ≥ 63):</span>
                            <span className={upperBonus > 0 ? 'bonus-earned' : 'bonus-missed'}>
                {upperBonus > 0 ? '+35' : '0'}
              </span>
                        </div>
                        <div className="breakdown-total">
                            <span>Upper Total:</span>
                            <span>{upperTotal}</span>
                        </div>
                    </div>

                    <div className="breakdown-section">
                        <h3>Lower Section</h3>
                        <div className="breakdown-total">
                            <span>Lower Total:</span>
                            <span>{lowerSectionTotal}</span>
                        </div>
                    </div>

                    <div className="grand-total">
                        <span>GRAND TOTAL:</span>
                        <span>{finalScore}</span>
                    </div>
                </div>

                <div className="game-over-actions">
                    <button className="btn btn-primary btn-large" onClick={onNewGame}>
                        🎮 Play Again
                    </button>
                </div>

                <div className="score-rating">
                    {finalScore >= 300 && <p className="rating excellent">🏆 Excellent! You're a Yahtzee master!</p>}
                    {finalScore >= 250 && finalScore < 300 && <p className="rating great">⭐ Great job! Above average score!</p>}
                    {finalScore >= 200 && finalScore < 250 && <p className="rating good">👍 Good game! Nice rolling!</p>}
                    {finalScore < 200 && <p className="rating okay">🎯 Keep practicing! You'll get better!</p>}
                </div>
            </div>
        </div>
    );
};

export default GameOverScreen;