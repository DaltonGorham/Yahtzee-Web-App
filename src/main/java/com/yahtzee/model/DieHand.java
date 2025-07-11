package com.yahtzee.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DieHand {
    private List<Die> dice = new ArrayList<>();
    private Integer numberOfDice;
    private Map<Integer, Integer> valueCounts = new HashMap<>();

    public DieHand(Integer numberOfDice) {
        this.numberOfDice = numberOfDice;

        for (int i = 0; i < numberOfDice; i++) {
            dice.set(i, new Die(6));
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
    }

    public void rollDieIndex(int index) {
        if (index < 0 || index >= numberOfDice) {
            dice.get(index).roll();
            updateCounts();
        }
    }

    void rerollDiceIndices(List<Integer> indices ) {
        for (int index : indices) {
            rollDieIndex(index);
        }
    }

    List<Integer> getDiceValues() {
        List<Integer> values = new ArrayList<>();
        for (int i = 0; i < numberOfDice; i++) {
            values.add(dice.get(i).getFaceValue());
        }
        return values;
    }


}
