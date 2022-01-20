package com.example.ForestFireSimulation.Security.model;

import com.example.ForestFireSimulation.SplData.model.Division;
import com.example.ForestFireSimulation.SplData.model.Range;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "app_user")
public class AppUser {

    @Id
    @SequenceGenerator(
            name = "user_id_seq",
            sequenceName = "user_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "user_id_seq")
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "username",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String username;

    @Column(
            name = "password",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String password;

    @Column(
            name = "designation",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String designation;

    @OneToOne
    @JoinColumn(
            name = "division",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private Division division;

    @OneToOne
    @JoinColumn(
            name = "range",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private Range range;

    @Column(
            name = "pfp",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String pfp;

    @ManyToMany(fetch = EAGER)
    private Collection<AppRole> roles = new ArrayList<>();
}
