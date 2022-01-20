package com.example.ForestFirePrediction.SplData.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "fire_size")
public class FireSize {
    @Id
    @SequenceGenerator(
            name = "fire_size_id_seq",
            sequenceName = "fire_size_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "fire_size_id_seq")
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "grade",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String grade;

    @Column(
            name = "size",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String size;

    @Column(
            name = "img",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String img;
}
