package com.example.ForestFireSimulation.SplData.service;

import com.example.ForestFireSimulation.SplData.model.Division;
import com.example.ForestFireSimulation.SplData.model.Range;
import com.example.ForestFireSimulation.SplData.model.Species;
import com.example.ForestFireSimulation.SplData.model.Wildlife;
import com.example.ForestFireSimulation.SplData.repo.DivisionRepo;
import com.example.ForestFireSimulation.SplData.repo.RangeRepo;
import com.example.ForestFireSimulation.SplData.repo.SpeciesRepo;
import com.example.ForestFireSimulation.SplData.repo.WildlifeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class SplDataServiceImpl implements SplDataService {

    private final RangeRepo rangeRepo;
    private final DivisionRepo divisionRepo;
    private final WildlifeRepo wildlifeRepo;
    private final SpeciesRepo speciesRepo;

//    ------------------------------------- RANGE ----------------------------------------------------------------------

    @Override
    public List<Range> getRangeList() {
        log.info("Fetching all Ranges");
        return rangeRepo.findAll();
    }

    @Override
    public Range getRange(String rangeName) {
        Optional<Range> rangeByName = Optional.ofNullable(rangeRepo.findRangeByName(rangeName));
        if(!rangeByName.isPresent()){
            throw new IllegalStateException("Range with name: "+ rangeName +" not found.");
        }else{
            log.info("Fetching range {}", rangeName);
            Range range = rangeRepo.findRangeByName(rangeName);
            return range;
        }
    }

    @Override
    public Range saveRange(Range range) {
        Optional<Range> rangeByName = Optional.ofNullable(rangeRepo.findRangeByName(range.getName()));
        if(rangeByName.isPresent()){
            throw new IllegalStateException("Range Already Present.");
        }else{
            log.info("Saving new range {}", range.getName());
            return rangeRepo.save(range);
        }
    }

    @Transactional @Override
    public void updateRange(Range range) {
        Optional<Range> rangeById = rangeRepo.findById(range.getId());
        if(rangeById.isEmpty()){
            throw new IllegalStateException("Range does not exist.");
        }else{
            log.info("Updating range {}", range.getId());
            Range appRange = rangeRepo.findRangeById(range.getId());

            if(range.getName() != null && !Objects.equals(range.getName(), appRange.getName())){
                appRange.setName(range.getName());
            }
            if(range.getDescription() != null && !Objects.equals(range.getDescription(), appRange.getDescription())){
                appRange.setDescription(range.getDescription());
            }
            if(range.getImg() != null && !Objects.equals(range.getImg(), appRange.getImg())){
                appRange.setImg(range.getImg());
            }
        }
    }

    @Override
    public void deleteRange(String rangeName) {
        Optional<Range> rangeByName = Optional.ofNullable(rangeRepo.findRangeByName(rangeName));
        if(!rangeByName.isPresent()){
            throw new IllegalStateException("Range with name: " + rangeName + " does not exist.");
        }else{
            log.info("Deleting Range: {}", rangeName);
            Range range = rangeRepo.findRangeByName(rangeName);
            rangeRepo.delete(range);
        }
    }

//    --------------------------------------------- DIVISION -----------------------------------------------------------

    @Override
    public List<Division> getDivisionList() {
        log.info("Fetching all Divisions");
        return divisionRepo.findAll();
    }

    @Override
    public Division getDivision(String divisionName) {
        Optional<Division> divisionByName = Optional.ofNullable(divisionRepo.findDivisionByName(divisionName));
        if(divisionByName.isEmpty()){
            throw new IllegalStateException("Division with name: "+ divisionName +" not found.");
        }else{
            log.info("Fetching division {}", divisionName);
            Division division = divisionRepo.findDivisionByName(divisionName);
            return division;
        }
    }

    @Override
    public Division saveDivision(Division division) {
        Optional<Division> divisionByName = Optional.ofNullable(divisionRepo.findDivisionByName(division.getName()));
        if(divisionByName.isPresent()){
            throw new IllegalStateException("Division Already Present.");
        }else{
            log.info("Saving new division {}", division.getName());
            return divisionRepo.save(division);
        }
    }

    @Transactional @Override
    public void updateDivision(Division division) {
        Optional<Division> divisionById = divisionRepo.findById(division.getId());
        if(divisionById.isEmpty()){
            throw new IllegalStateException("Division does not exist.");
        }else{
            log.info("Updating division {}", division.getId());
            Division appDivision = divisionRepo.findDivisionById(division.getId());

            if(division.getName() != null && !Objects.equals(division.getName(), appDivision.getName())){
                appDivision.setName(division.getName());
            }
            if(division.getDescription() != null && !Objects.equals(division.getDescription(), appDivision.getDescription())){
                appDivision.setDescription(division.getDescription());
            }
            if(division.getImg() != null && !Objects.equals(division.getImg(), appDivision.getImg())){
                appDivision.setImg(division.getImg());
            }
        }
    }

    @Override
    public void deleteDivision(String divisionName) {
        Optional<Division> divisionByName = Optional.ofNullable(divisionRepo.findDivisionByName(divisionName));
        if(divisionByName.isEmpty()){
            throw new IllegalStateException("Division with name: " + divisionName + " does not exist.");
        }else{
            log.info("Deleting Division: {}", divisionByName);
            Division division = divisionRepo.findDivisionByName(divisionName);
            divisionRepo.delete(division);
        }
    }

//    ------------------------------------- WILDLIFE -------------------------------------------------------------------

    @Override
    public List<Wildlife> getWildlifeList(){
        log.info("Fetching all Wildlife List...");
        return wildlifeRepo.findAll();
    }

    @Override
    public Wildlife getWildlife(String wildlifeName) {
        Optional<Wildlife> wildlifeByName = Optional.ofNullable(wildlifeRepo.findWildlifeByName(wildlifeName));
        if(wildlifeByName.isEmpty()){
            throw new IllegalStateException("Wildlife with name: "+ wildlifeName +" not found.");
        }else{
            log.info("Fetching wildlife {}...", wildlifeName);
            Wildlife wildlife = wildlifeRepo.findWildlifeByName(wildlifeName);
            return wildlife;
        }
    }

    @Override
    public Wildlife saveWildlife(Wildlife wildlife) {
        Optional<Wildlife> wildlifeByName = Optional.ofNullable(wildlifeRepo.findWildlifeByName(wildlife.getName()));
        if(wildlifeByName.isPresent()){
            throw new IllegalStateException("Wildlife "+ wildlife.getName() +" Already Present.");
        }else{
            log.info("Saving new Wildlife {}", wildlife.getName());
            return wildlifeRepo.save(wildlife);
        }
    }

    @Transactional @Override
    public void updateWildlife(Wildlife wildlife) {
        Optional<Wildlife> wildlifeById = wildlifeRepo.findById(wildlife.getId());
        if(wildlifeById.isEmpty()){
            throw new IllegalStateException("Wildlife "+wildlife.getName()+" does not exist.");
        }else{
            log.info("Updating Wildlife: {}...", wildlife.getId());
            Wildlife appWildlife = wildlifeRepo.findWildlifeById(wildlife.getId());

            if(wildlife.getName() != null && !Objects.equals(wildlife.getName(), appWildlife.getName())){
                appWildlife.setName(wildlife.getName());
            }
            if(wildlife.getAlias() != null && !Objects.equals(wildlife.getAlias(), appWildlife.getAlias())){
                appWildlife.setAlias(wildlife.getAlias());
            }
            if(wildlife.getImg() != null && !Objects.equals(wildlife.getImg(), appWildlife.getImg())){
                appWildlife.setImg(wildlife.getImg());
            }
        }
    }

    @Override
    public void deleteWildlife(String wildlifeName) {
        Optional<Wildlife> wildlifeByName = Optional.ofNullable(wildlifeRepo.findWildlifeByName(wildlifeName));
        if(wildlifeByName.isEmpty()){
            throw new IllegalStateException("Wildlife with name: " + wildlifeName + " does not exist.");
        }else{
            log.info("Deleting Wildlife: {}...", wildlifeByName);
            Wildlife wildlife = wildlifeRepo.findWildlifeByName(wildlifeName);
            wildlifeRepo.delete(wildlife);
        }
    }

//    ------------------------------------------ SPECIE ----------------------------------------------------------------

    @Override
    public List<Species> getSpeciesList(){
        log.info("Fetching all Species...");
        return speciesRepo.findAll();
    }

    @Override
    public Species getSpecies(String speciesName) {
        Optional<Species> speciesByName = Optional.ofNullable(speciesRepo.findSpeciesByName(speciesName));
        if(speciesByName.isEmpty()){
            throw new IllegalStateException("Species with name: "+ speciesName +" not found.");
        }else{
            log.info("Fetching specie {}...", speciesName);
            Species species = speciesRepo.findSpeciesByName(speciesName);
            return species;
        }
    }

    @Override
    public Species saveSpecies(Species species) {
        Optional<Species> speciesByName = Optional.ofNullable(speciesRepo.findSpeciesByName(species.getName()));
        if(speciesByName.isPresent()){
            throw new IllegalStateException("Species "+ species.getName() +" Already Present.");
        }else{
            log.info("Saving new Species {}", species.getName());
            return speciesRepo.save(species);
        }
    }

    @Transactional @Override
    public void updateSpecies(Species species) {
        Optional<Species> speciesById = speciesRepo.findById(species.getId());
        if(speciesById.isEmpty()){
            throw new IllegalStateException("Species "+ species.getName() +" does not exist.");
        }else{
            log.info("Updating Species: {}...", species.getId());
            Species appSpecies = speciesRepo.findSpeciesById(species.getId());

            if(species.getName() != null && !Objects.equals(species.getName(), appSpecies.getName())){
                appSpecies.setName(species.getName());
            }
            if(species.getAlias() != null && !Objects.equals(species.getAlias(), appSpecies.getAlias())){
                appSpecies.setAlias(species.getAlias());
            }
            if(species.getImg() != null && !Objects.equals(species.getImg(), appSpecies.getImg())){
                appSpecies.setImg(species.getImg());
            }
        }
    }

    @Override
    public void deleteSpecies(String speciesName) {
        Optional<Species> speciesByName = Optional.ofNullable(speciesRepo.findSpeciesByName(speciesName));
        if(speciesByName.isEmpty()){
            throw new IllegalStateException("Specie with name: " + speciesName + " does not exist.");
        }else{
            log.info("Deleting Specie: {}...", speciesByName);
            Species species = speciesRepo.findSpeciesByName(speciesName);
            speciesRepo.delete(species);
        }
    }
}
