package com.yahtzee;

import com.yahtzee.dto.response.GameStateResponse;
import com.yahtzee.model.GameState;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YahtzeeService {

    private GameState gameState = new GameState();

    private GameStateResponse buildResponse() {
        GameStateResponse response = new GameStateResponse();
        response.setDice(gameState.getHand().getDiceValues());
        response.setRerollCount(gameState.getRerollCount());
        response.setRollsRemaining(3 - gameState.getRerollCount());
        response.setCurrentRound(gameState.getCurrentRound());
        response.setWaitingForScore(gameState.isWaitingForScore());
        response.setScorecard(gameState.getScorecard());
        response.setCombination(gameState.getHand().getBestCombination());
        response.setGameActive(gameState.isGameActive());
        response.setTotalScore(gameState.calculateTotalScore());
        return response;
    }

    public GameStateResponse startNewGame() {
        gameState.newGame();
        return buildResponse();
    }

    public GameStateResponse rollAll() {
        if (gameState.isGameActive() && gameState.getRerollCount() < 3 && !gameState.isWaitingForScore()) {
            gameState.getHand().rollAll();
            gameState.setRerollCount(gameState.getRerollCount() + 1);
        }

        if (gameState.getRerollCount() == 3){
            gameState.setWaitingForScore(true);
        }

        return buildResponse();
    }

    public GameStateResponse reroll(List<Integer> indices) {
        if (indices == null || indices.isEmpty()) {
            throw new IllegalArgumentException("Indices list cannot be null or empty.");
        }

        for (int index : indices) {
            if (index < 0 || index >= 5) {
                throw new IllegalArgumentException("Die index out of bounds: " + index);
            }
        }

        if (gameState.isGameActive() && gameState.getRerollCount() < 3 && !gameState.isWaitingForScore()) {
            gameState.getHand().rerollDiceIndices(indices);
            gameState.setRerollCount(gameState.getRerollCount() + 1);
        }

        if (gameState.getRerollCount() == 3){
            gameState.setWaitingForScore(true);
        }

        return buildResponse();
    }

    public GameStateResponse chooseScore() {
        if (gameState.isGameActive() && !gameState.isWaitingForScore()) {
            gameState.setWaitingForScore(true);
        }
        return buildResponse();
    }

    public GameStateResponse score(String category) {
        if (gameState.isGameActive() && gameState.isWaitingForScore()) {
            gameState.scoreCategory(category);
        }
        return buildResponse();
    }



}
