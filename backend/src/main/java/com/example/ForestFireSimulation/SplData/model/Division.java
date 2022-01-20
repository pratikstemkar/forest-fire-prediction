package com.example.ForestFireSimulation.SplData.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "division_list")
public class Division {
    @Id
    @SequenceGenerator(
            name = "division_id_seq",
            sequenceName = "division_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "division_id_seq")
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
            name = "description",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(
            name = "img",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String img;
}