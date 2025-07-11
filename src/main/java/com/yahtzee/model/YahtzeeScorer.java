package com.yahtzee.model;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class YahtzeeScorer {
    public int calculateScore(DieHand hand, String category) {
        Map<Integer, Integer> valueCounts = hand.getCounts();

        return switch(category) {
            case "ones" -> valueCounts.getOrDefault(1, 0);
            case "twos" -> valueCounts.getOrDefault(2, 0);
            case "threes" -> valueCounts.getOrDefault(3, 0);
            case "fours" -> valueCounts.getOrDefault(4, 0);
            case "fives" -> valueCounts.getOrDefault(5, 0);
            case "sixes" -> valueCounts.getOrDefault(6, 0);
            default -> 0;
        };
    }
}
