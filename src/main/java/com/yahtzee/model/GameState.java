package com.yahtzee.model;

import com.yahtzee.YahtzeeScorer;
import com.yahtzee.dto.response.PossibleScore;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter

public class GameState {
    private DieHand hand;
    private Integer rerollCount;
    private boolean gameActive;
    private Integer currentRound;
    private Map<String, Integer> scorecard;
    private Set<String> usedCategories;
    private boolean waitingForScore;
    private YahtzeeScorer scorer;

    public void initializeScorecard() {
        scorecard.clear();
        usedCategories.clear();

        // Initialize all categories as unscored (-1 means not used yet)
        scorecard.put("ones", -1);
        scorecard.put("twos", -1);
        scorecard.put("threes", -1);
        scorecard.put("fours", -1);
        scorecard.put("fives", -1);
        scorecard.put("sixes", -1);
        scorecard.put("three-of-a-kind", -1);
        scorecard.put("four-of-a-kind", -1);
        scorecard.put("full-house", -1);
        scorecard.put("small-straight", -1);
        scorecard.put("large-straight", -1);
        scorecard.put("yahtzee", -1);
        scorecard.put("chance", -1);

    }

    public GameState() {
        this.hand = new DieHand(5);
        this.rerollCount = 0;
        this.gameActive = false;
        this.currentRound = 1;
        this.scorecard = new HashMap<>();
        this.usedCategories = new HashSet<>();
        this.waitingForScore = false;
        this.scorer = new YahtzeeScorer();
        initializeScorecard();
    }

    public void newGame() {
        initializeScorecard();
        this.currentRound = 1;
        this.rerollCount = 0;
        this.gameActive = true;
        this.waitingForScore = false;
        this.hand.rollAll();
        this.scorer = new YahtzeeScorer();
    }

    public int calculateTotalScore() {
        int totalScore = 0;
        int upperTotal = 0;

        for (String category : new String[]{"ones", "twos", "threes", "fours", "fives", "sixes"}) {
            if (scorecard.containsKey(category) && scorecard.get(category) > -1) {
                upperTotal += scorecard.get(category);
            }
        }

        // Upper section bonus
        if (upperTotal >= 63) {
            totalScore += 35;
        }

        totalScore += upperTotal;

        for (String category : new String[]{"three-of-a-kind", "four-of-a-kind", "full-house",
                "small-straight", "large-straight", "yahtzee", "chance"}) {
            if (scorecard.containsKey(category) && scorecard.get(category) > -1) {
                totalScore += scorecard.get(category);
            }
        }
        return totalScore;
    }

    public List<PossibleScore> getPossibleScores() {
        List<PossibleScore> possibleScores = new ArrayList<>();

        // Define all categories with their display names and internal keys
        Map<String, String> categories = new HashMap<>();
        categories.put("Ones", "ones");
        categories.put("Twos", "twos");
        categories.put("Threes", "threes");
        categories.put("Fours", "fours");
        categories.put("Fives", "fives");
        categories.put("Sixes", "sixes");
        categories.put("Three of a kind", "three-of-a-kind");
        categories.put("Four of a kind", "four-of-a-kind");
        categories.put("Full house", "full-house");
        categories.put("Small straight", "small-straight");
        categories.put("Large straight", "large-straight");
        categories.put("Yahtzee", "yahtzee");
        categories.put("Chance", "chance");

        for (Map.Entry<String, String> entry : categories.entrySet()) {
            String displayName = entry.getKey();
            String internalKey = entry.getValue();

            Integer score = scorer.calculateScore(hand, internalKey);
            boolean available = scorecard.containsKey(internalKey) && scorecard.get(internalKey) == -1;
            PossibleScore possibleScore = new PossibleScore();
            possibleScore.setCategory(displayName);
            possibleScore.setScore(score);
            possibleScore.setAvailable(available);
            possibleScores.add(possibleScore);
        }
        return possibleScores;
    }

    public boolean scoreCategory(String category) {
        if (usedCategories.contains(category) || !gameActive) {
            return false;
        }

        //score the category
        int score = scorer.calculateScore(hand, category);
        scorecard.put(category, score);
        usedCategories.add(category);
        waitingForScore = false;

        if (usedCategories.size() >= 13) {
            gameActive = false;
        }
        else {
            nextRound();
        }
        return true;
    }

    public void nextRound() {
        if (currentRound >= 13) {
            gameActive = false;
            return;
        }

        currentRound++;
        rerollCount = 0;
        waitingForScore = false;
        hand.rollAll();
    }


}
