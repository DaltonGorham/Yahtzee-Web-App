package com.yahtzee.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.concurrent.ThreadLocalRandom;

@Getter
@Setter
@ToString
public class Die {
    private Integer numberOfSides;
    private Integer faceValue;

    public Die(Integer numberOfSides) {
        this.numberOfSides = numberOfSides;
    }

    public void roll() {
        this.faceValue = ThreadLocalRandom.current().nextInt(1, numberOfSides + 1);
    }

}
