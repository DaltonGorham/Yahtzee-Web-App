package com.yahtzee;

import com.yahtzee.model.DieHand;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class YahtzeeScorer {
    public int calculateScore(DieHand hand, String category) {
        Map<Integer, Integer> valueCounts = hand.getCounts();

        return switch (category) {
            case "ones" -> valueCounts.getOrDefault(1, 0);
            case "twos" -> valueCounts.getOrDefault(2, 0) * 2;
            case "threes" -> valueCounts.getOrDefault(3, 0) * 3;
            case "fours" -> valueCounts.getOrDefault(4, 0) * 4;
            case "fives" -> valueCounts.getOrDefault(5, 0) * 5;
            case "sixes" -> valueCounts.getOrDefault(6, 0) * 6;
            case "three-of-a-kind" -> hand.hasThreeOfAKind() ? hand.calculateChance() : 0;
            case "four-of-a-kind" -> hand.hasFourOfAKind() ? hand.calculateChance() : 0;
            case "full-house" -> hand.hasFullHouse() ? 25 : 0;
            case "small-straight" -> hand.hasSmallStraight() ? 30 : 0;
            case "large-straight" -> hand.hasLargeStraight() ? 40 : 0;
            case "yahtzee" -> hand.hasYahtzee() ? 50 : 0;
            case "chance" -> hand.calculateChance();
            default -> 0;
        };
    }
}
