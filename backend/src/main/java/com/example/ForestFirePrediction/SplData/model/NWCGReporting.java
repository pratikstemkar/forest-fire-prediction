package com.example.ForestFirePrediction.SplData.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "nwcg_reporting")
public class NWCGReporting {
    @Id
    @SequenceGenerator(
            name = "nwcg_reporting_id_seq",
            sequenceName = "nwcg_reporting_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "nwcg_reporting_id_seq")
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
            name = "agency",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String agency;

    @Column(
            name = "img",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String img;
}