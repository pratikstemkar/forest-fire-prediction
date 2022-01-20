package com.example.ForestFireSimulation.SplData.api;

import com.example.ForestFireSimulation.SplData.model.Division;
import com.example.ForestFireSimulation.SplData.model.Range;
import com.example.ForestFireSimulation.SplData.model.Species;
import com.example.ForestFireSimulation.SplData.model.Wildlife;
import com.example.ForestFireSimulation.SplData.service.SplDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController @RequestMapping("/api/spldata/")
@RequiredArgsConstructor @Slf4j
public class SplDataController {

    private final SplDataService splDataService;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception e) throws IOException {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", e.getLocalizedMessage());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    ---------------------------------------- RANGE -------------------------------------------------------------------

    //    Get Ranges List
    @GetMapping("/ranges")
    public ResponseEntity<List<Range>> getRangeList(){
        return ResponseEntity.ok().body(splDataService.getRangeList());
    }

    //    Get a specific Range
    @GetMapping("/range/{rangeName}")
    public ResponseEntity<Range> getRange(@PathVariable("rangeName") String rangeName){
        return ResponseEntity.ok().body(splDataService.getRange(rangeName));
    }

    //    Save a new Range
    @PostMapping("/range/save")
    public ResponseEntity<Range> saveRange(@RequestBody Range range){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/security/range/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveRange(range));
    }

    //    Delete a range
    @DeleteMapping("/range/delete/{rangeName}")
    public ResponseEntity<?> deleteRange(@PathVariable("rangeName") String rangeName){
        splDataService.deleteRange(rangeName);
        return ResponseEntity.ok().body("Range deleted with name: " + rangeName);
    }

    //    Update details of a Range
    @PutMapping("/range/update")
    public ResponseEntity<?> updateRange(@RequestBody Range range){
        splDataService.updateRange(range);
        return ResponseEntity.ok().body("Range updated." );
    }

//    ---------------------------------------------- DIVISION ----------------------------------------------------------

    //    Get Divsions List
    @GetMapping("/divisions")
    public ResponseEntity<List<Division>> getDivisionList(){
        return ResponseEntity.ok().body(splDataService.getDivisionList());
    }

    //    Get a specific Division
    @GetMapping("/division/{divisionName}")
    public ResponseEntity<Division> getDivision(@PathVariable("divisionName") String divisionName){
        return ResponseEntity.ok().body(splDataService.getDivision(divisionName));
    }

    //    Save a new Division
    @PostMapping("/division/save")
    public ResponseEntity<Division> saveDivision(@RequestBody Division division){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/security/division/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveDivision(division));
    }

    //    Delete a Division
    @DeleteMapping("/division/delete/{divisionName}")
    public ResponseEntity<?> deleteDivision(@PathVariable("divisionName") String divisionName){
        splDataService.deleteDivision(divisionName);
        return ResponseEntity.ok().body("Division deleted with name: " + divisionName);
    }

    //    Update details of a Division
    @PutMapping("/division/update")
    public ResponseEntity<?> updateDivision(@RequestBody Division division){
        splDataService.updateDivision(division);
        return ResponseEntity.ok().body("Division updated." );
    }

//    ----------------------------------------- WILDLIFE ---------------------------------------------------------------

    //    Get all Wildlife
    @GetMapping("/wildlifes")
    public ResponseEntity<List<Wildlife>> getWildlifeList(){
        return ResponseEntity.ok().body(splDataService.getWildlifeList());
    }

    //    Get a specific Wildlife
    @GetMapping("/wildlife/{wildlifeName}")
    public ResponseEntity<Wildlife> getWildlife(@PathVariable("wildlifeName") String wildlifeName){
        return ResponseEntity.ok().body(splDataService.getWildlife(wildlifeName));
    }

    //    Save a new Wildlife
    @PostMapping("/wildlife/save")
    public ResponseEntity<Wildlife> saveWildlife(@RequestBody Wildlife wildlife){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/spldata/wildlife/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveWildlife(wildlife));
    }

    //    Delete a Wildlife
    @DeleteMapping("/wildlife/delete/{wildlifeName}")
    public ResponseEntity<?> deleteWildlife(@PathVariable("wildlifeName") String wildlifeName){
        splDataService.deleteWildlife(wildlifeName);
        return ResponseEntity.ok().body("Wildlife deleted with name: " + wildlifeName);
    }

    //    Update details of a Wildlife
    @PutMapping("/wildlife/update")
    public ResponseEntity<?> updateWildlife(@RequestBody Wildlife wildlife){
        splDataService.updateWildlife(wildlife);
        return ResponseEntity.ok().body("Wildlife updated." );
    }

//    ------------------------------------------- SPECIE ---------------------------------------------------------------

    //    Get all Species
    @GetMapping("/species")
    public ResponseEntity<List<Species>> getSpecies(){
        return ResponseEntity.ok().body(splDataService.getSpeciesList());
    }

    //    Get a specific Specie
    @GetMapping("/species/{speciesName}")
    public ResponseEntity<Species> getSpecies(@PathVariable("speciesName") String speciesName){
        return ResponseEntity.ok().body(splDataService.getSpecies(speciesName));
    }

    //    Save a new Specie
    @PostMapping("/species/save")
    public ResponseEntity<Species> saveSpecies(@RequestBody Species species){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/spldata/species/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveSpecies(species));
    }

    //    Delete a Specie
    @DeleteMapping("/species/delete/{speciesName}")
    public ResponseEntity<?> deleteSpecies(@PathVariable("speciesName") String speciesName){
        splDataService.deleteSpecies(speciesName);
        return ResponseEntity.ok().body("Species deleted with name: " + speciesName);
    }

    //    Update details of a Specie
    @PutMapping("/species/update")
    public ResponseEntity<?> updateSpecies(@RequestBody Species species){
        splDataService.updateSpecies(species);
        return ResponseEntity.ok().body("Species updated." );
    }
}
