package com.yahtzee.model;

import java.util.*;
import java.util.stream.Collectors;

public class DieHand {
    private List<Die> dice = new ArrayList<>();
    private Integer numberOfDice;
    private Map<Integer, Integer> valueCounts = new HashMap<>();

    public DieHand(Integer numberOfDice) {
        this.numberOfDice = numberOfDice;

        for (int i = 0; i < numberOfDice; i++) {
            dice.add(new Die(6));
        }

    }

    public void updateCounts() {
        valueCounts.clear();
        for (int i = 0; i < numberOfDice; i++) {
            int faceValue = dice.get(i).getFaceValue();
            valueCounts.put(faceValue, valueCounts.getOrDefault(faceValue, 0) + 1);
        }
    }

    public Map<Integer, Integer> getCounts() {
        return valueCounts;
    }


    public void rollAll() {
        for (int i = 0; i < numberOfDice; i++) {
            dice.get(i).roll();
        }
        updateCounts();
    }

    public void rollDieIndex(int index) {
        if (index >= 0 && index < numberOfDice) {
            dice.get(index).roll();
        }
        updateCounts();
    }

    public void rerollDiceIndices(List<Integer> indices) {
        for (int index : indices) {
            rollDieIndex(index);
        }
        updateCounts();
    }

    public List<Integer> getDiceValues() {
        List<Integer> values = new ArrayList<>();
        for (int i = 0; i < numberOfDice; i++) {
            values.add(dice.get(i).getFaceValue());
        }
        return values;
    }

    public boolean hasThreeOfAKind() {
        for (Map.Entry<Integer, Integer> entry : valueCounts.entrySet()) {
            if (entry.getValue() == 3) {
                return true;
            }
        }
        return false;
    }

    public boolean hasFourOfAKind() {
        for (Map.Entry<Integer, Integer> entry : valueCounts.entrySet()) {
            if (entry.getValue() == 4) {
                return true;
            }
        }
        return false;
    }

    public boolean hasSmallStraight() {
        // Use set to take out duplicates
        Set<Integer> uniqueValues = dice.stream()
                .map(Die::getFaceValue)
                .collect(Collectors.toSet());

        // Check for 4 consecutive numbers
        for (int start = 1; start <= 3; start++) {
            if (uniqueValues.containsAll(List.of(start, start + 1, start + 2, start + 3))) {
                return true;
            }
        }
        return false;
    }

    public boolean hasLargeStraight() {
        // Use set to take out duplicates
        Set<Integer> uniqueValues = dice.stream()
                .map(Die::getFaceValue)
                .collect(Collectors.toSet());

        if (uniqueValues.size() != 5) {
            return false;
        }

        return uniqueValues.equals(Set.of(1, 2, 3, 4, 5)) || uniqueValues.equals(Set.of(2, 3, 4, 5, 6));
    }

    public boolean hasFullHouse() {
        boolean hasThreeOfAKind = false;
        boolean hasPair = false;
        for (Map.Entry<Integer, Integer> entry : valueCounts.entrySet()) {
            if (entry.getValue() == 3) {
                hasThreeOfAKind = true;
            }
            else if (entry.getValue() == 4) {
                hasPair = true;
            }
        }
        return hasThreeOfAKind && hasPair;
    }

    public boolean hasYahtzee() {
        for (Map.Entry<Integer, Integer> entry : valueCounts.entrySet()) {
            if (entry.getValue() == 5) {
                return true;
            }
        }
        return false;
    }

    public String getBestCombination() {
        if (hasYahtzee()) return "yahtzee";
        if (hasLargeStraight()) return "large-straight";
        if (hasSmallStraight()) return "small-straight";
        if (hasFourOfAKind()) return "four-of-a-kind";
        if (hasThreeOfAKind()) return "three-of-a-kind";
        return "chance";
    }



    public Integer calculateChance() {
        int sum = 0;
        for (int i = 0; i < numberOfDice; i++) {
            sum += dice.get(i).getFaceValue();
        }
        return sum;
    }


}
