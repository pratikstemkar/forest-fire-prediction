package com.example.ForestFirePrediction.SplData.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "owner_list")
public class Owner {
    @Id
    @SequenceGenerator(
            name = "owner_list_id_seq",
            sequenceName = "owner_list_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "owner_list_id_seq")
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
            name = "img",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String img;
}