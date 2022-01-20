package com.example.ForestFireSimulation.SplData.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "species_damaged_master")
public class Species {
    @Id
    @SequenceGenerator(
            name = "species_id_seq",
            sequenceName = "species_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "species_id_seq")
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String name;

    @Column(
            name = "alias",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String alias;

    @Column(
            name = "img",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String img;
}