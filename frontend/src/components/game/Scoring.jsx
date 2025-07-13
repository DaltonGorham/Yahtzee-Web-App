import React from "react";
import "./Scoring.css";

const ScoreOptions = ({ possibleScores = [], scorecard = {}, onSelectCategory }) => {
    const normalizedScorecard = Object.keys(scorecard).reduce((acc, key) => {
        acc[key.toLowerCase()] = scorecard[key];
        return acc;
    }, {});

    const displayNameToKey = {
        Ones: "ones",
        Twos: "twos",
        Threes: "threes",
        Fours: "fours",
        Fives: "fives",
        Sixes: "sixes",
        "Three of a kind": "three-of-a-kind",
        "Four of a kind": "four-of-a-kind",
        "Full house": "full-house",
        "Small straight": "small-straight",
        "Large straight": "large-straight",
        Yahtzee: "yahtzee",
        Chance: "chance",
    };

    // Define the correct order for each section
    const upperCategoryOrder = [
        "Ones",
        "Twos",
        "Threes",
        "Fours",
        "Fives",
        "Sixes"
    ];

    const lowerCategoryOrder = [
        "Three of a kind",
        "Four of a kind",
        "Full house",
        "Small straight",
        "Large straight",
        "Yahtzee",
        "Chance"
    ];

    const upperCategories = new Set(upperCategoryOrder);
    const lowerCategories = new Set(lowerCategoryOrder);

    // Helper function to sort by predefined order
    const sortByOrder = (scores, orderArray) => {
        return scores.sort((a, b) => {
            const indexA = orderArray.indexOf(a.category);
            const indexB = orderArray.indexOf(b.category);
            return indexA - indexB;
        });
    };

    // Filter and sort possibleScores into upper and lower
    const upperScores = sortByOrder(
        possibleScores.filter((opt) => upperCategories.has(opt.category)),
        upperCategoryOrder
    );

    const lowerScores = sortByOrder(
        possibleScores.filter((opt) => lowerCategories.has(opt.category)),
        lowerCategoryOrder
    );

    // Helper to render list items
    const renderScoreList = (scores) =>
        scores.map((option, index) => {
            const displayName = option.category;
            const internalKey = displayNameToKey[displayName];
            const scoreAlreadySet = normalizedScorecard[internalKey] !== -1;
            const displayScore = scoreAlreadySet
                ? normalizedScorecard[internalKey]
                : option.score;

            return (
                <li
                    key={`${internalKey}-${index}`}
                    className={`score-option ${scoreAlreadySet ? "used" : "available"}`}
                    onClick={() =>
                        !scoreAlreadySet && option.available && onSelectCategory(internalKey)
                    }
                >
                    <span className="category-name">{displayName}</span>
                    <span className="score-value">{displayScore}</span>
                </li>
            );
        });

    return (
        <div className="score-options-container">
            <div className="header-container">
                <h2>Select a Score Category</h2>
            </div>
            <div className="score-options-columns">
                <ul className="score-list upper">{renderScoreList(upperScores)}</ul>
                <ul className="score-list lower">{renderScoreList(lowerScores)}</ul>
            </div>
        </div>
    );
};

export default ScoreOptions;