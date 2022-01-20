package com.example.ForestFirePrediction.SplData.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "source_system")
public class SourceSystem {
    @Id
    @SequenceGenerator(
            name = "source_system_id_seq",
            sequenceName = "source_system_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "source_system_id_seq")
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
            name = "type",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String type;

    @Column(
            name = "img",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String img;
}