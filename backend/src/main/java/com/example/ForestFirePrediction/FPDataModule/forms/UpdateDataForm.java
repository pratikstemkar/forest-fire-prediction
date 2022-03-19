package com.example.ForestFirePrediction.FPDataModule.forms;

import lombok.Data;

@Data
public class UpdateDataForm {
    private Long id;
    private String fire_size;
    private String fire_size_class;
}
