package com.yahtzee.dto.response;

import com.yahtzee.model.Die;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class GameStateResponse {
    private List<Integer> dice;
    private int rerollCount;
    private int rollsRemaining;
    private int currentRound;
    private boolean gameActive;
    private boolean waitingForScore;
    private String combination;
    private int totalScore;
    private Map<String, Integer> scorecard;
    private List<String> availableCategories;
    private List<PossibleScore> possibleScores;

}
