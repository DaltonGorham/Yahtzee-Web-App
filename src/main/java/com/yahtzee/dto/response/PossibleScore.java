package com.yahtzee.dto.response;


import lombok.Data;

@Data
public class PossibleScore {
    private String category;
    private Integer score;
    private boolean available;
}
