package com.example.ForestFireSimulation.SplData.service;

import com.example.ForestFireSimulation.SplData.model.Division;
import com.example.ForestFireSimulation.SplData.model.Range;
import com.example.ForestFireSimulation.SplData.model.Species;
import com.example.ForestFireSimulation.SplData.model.Wildlife;

import java.util.List;

public interface SplDataService {

    //    RANGE
    Range getRange(String rangeName);
    List<Range> getRangeList();
    Range saveRange(Range range);
    void updateRange(Range range);
    void deleteRange(String rangeName);

    //    DIVISION
    Division getDivision(String divisionName);
    List<Division> getDivisionList();
    Division saveDivision(Division division);
    void updateDivision(Division division);
    void deleteDivision(String divisionName);

    //    WILDLIFE
    Wildlife getWildlife(String wildlifeName);
    List<Wildlife> getWildlifeList();
    Wildlife saveWildlife(Wildlife wildlife);
    void updateWildlife(Wildlife wildlife);
    void deleteWildlife(String wildlifeName);

    //    SPECIE
    Species getSpecies(String speciesName);
    List<Species> getSpeciesList();
    Species saveSpecies(Species species);
    void updateSpecies(Species species);
    void deleteSpecies(String speciesName);
}
