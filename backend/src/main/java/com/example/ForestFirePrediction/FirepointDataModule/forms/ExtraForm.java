package com.example.ForestFirePrediction.FirepointDataModule.forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class ExtraForm {

    private Long id;
    private String name;
    private String alias;
    private Integer total_num;
}
