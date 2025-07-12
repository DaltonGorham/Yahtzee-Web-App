package com.yahtzee.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class RollRequest {
    private List<Integer> indices;
}
