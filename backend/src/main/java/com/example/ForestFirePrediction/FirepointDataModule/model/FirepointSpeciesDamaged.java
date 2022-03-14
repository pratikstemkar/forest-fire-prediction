package com.example.ForestFirePrediction.FirepointDataModule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "firepoint_data_species_damaged")
public class FirepointSpeciesDamaged {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "firepoint_species_id")
    private Long firepoint_species_id;

    @Column(name = "firepoint_data_id")
    private Long firepoint_data_id;

    @Column(name = "species_damaged_id")
    private Long species_damaged_id;

    @Column(name = "total_num")
    private Integer total_num;
}
