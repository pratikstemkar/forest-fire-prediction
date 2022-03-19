package com.example.ForestFirePrediction.FPDataModule.api;

import com.example.ForestFirePrediction.FPDataModule.forms.SaveDataForm;
import com.example.ForestFirePrediction.FPDataModule.forms.UpdateDataForm;
import com.example.ForestFirePrediction.FPDataModule.model.FPData;
import com.example.ForestFirePrediction.FPDataModule.service.FPDataService;
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

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor @Slf4j
public class FPDataController {

    private final FPDataService fpDataService;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception e) throws IOException {
        Map<String, String > errorResponse = new HashMap<>();
        errorResponse.put("message", e.getLocalizedMessage());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getFPDataCount(){
        return ResponseEntity.ok().body(fpDataService.getFPDataCount());
    }

    @GetMapping
    public ResponseEntity<List<FPData>> getAllData(){
        return ResponseEntity.ok().body(fpDataService.getAllData());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FPData> getFPData(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(fpDataService.getData(id));
    }

    @PostMapping("/save")
    public FPData saveData(@RequestBody SaveDataForm saveDataForm){
//        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/data/save").toUriString());
//        return ResponseEntity.created(uri).body(fpDataService.saveData(saveDataForm.getLatitude(), saveDataForm.getLongitude(), saveDataForm.getSource_system_type(), saveDataForm.getSource_system(), saveDataForm.getNwcg_reporting_agency(), saveDataForm.getDiscovery_date(), saveDataForm.getDiscovery_time(), saveDataForm.getCont_date(), saveDataForm.getCont_time(), saveDataForm.getState(), saveDataForm.getStat_cause_code(), saveDataForm.getOwner_code()));
        return fpDataService.saveData(saveDataForm.getLatitude(), saveDataForm.getLongitude(), saveDataForm.getSource_system_type(), saveDataForm.getSource_system(), saveDataForm.getNwcg_reporting_agency(), saveDataForm.getDiscovery_date(), saveDataForm.getDiscovery_time(), saveDataForm.getCont_date(), saveDataForm.getCont_time(), saveDataForm.getState(), saveDataForm.getStat_cause_code(), saveDataForm.getOwner_code());
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateData(@RequestBody UpdateDataForm updateDataForm){
        fpDataService.updateData(updateDataForm.getId(), updateDataForm.getFire_size(), updateDataForm.getFire_size_class());
        return ResponseEntity.ok().body("Data of ID " + updateDataForm.getId() + " updated.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteData(@PathVariable("id") Long id){
        fpDataService.deleteData(id);
        return ResponseEntity.ok().body("Data deleted with ID: " + id);
    }
}
