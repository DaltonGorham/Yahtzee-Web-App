package com.yahtzee;

import com.yahtzee.dto.request.ScoreRequest;
import com.yahtzee.dto.response.GameStateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/yahtzee")
public class YahtzeeController {

    @Autowired
    private YahtzeeService yahtzeeService;


    @PostMapping("/new-game")
    public GameStateResponse newGame() {
        return yahtzeeService.startNewGame();
    }

    @PostMapping("/roll-all")
    public GameStateResponse rollAll() {
        return yahtzeeService.rollAll();
    }

    @PostMapping("/reroll")
    public GameStateResponse reroll(@RequestBody List<Integer> indices) {
        return yahtzeeService.reroll(indices);
    }

    @PostMapping("/choose-score")
    public GameStateResponse chooseScore() {
        return yahtzeeService.chooseScore();
    }


    @PostMapping("/score")
    public GameStateResponse score(@RequestBody ScoreRequest request) {
        return yahtzeeService.score(request.getCategory());
    }

}
