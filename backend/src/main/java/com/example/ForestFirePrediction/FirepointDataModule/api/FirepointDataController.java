package com.example.ForestFirePrediction.FirepointDataModule.api;

//import com.example.ForestFirePrediction.FirepointDataModule.forms.DivisionForm;
import com.example.ForestFirePrediction.FirepointDataModule.forms.DivisionForm;
import com.example.ForestFirePrediction.FirepointDataModule.model.FirepointData;
//import com.example.ForestFirePrediction.FirepointDataModule.model.FirepointDataResponse;
import com.example.ForestFirePrediction.FirepointDataModule.model.FirepointDataDTO;
import com.example.ForestFirePrediction.FirepointDataModule.model.FirepointDataResponse;
import com.example.ForestFirePrediction.FirepointDataModule.repo.FirepointDataRepository;
//import com.example.ForestFirePrediction.FirepointDataModule.repo.FirepointSpeciesDamagedRepo;
//import com.example.ForestFirePrediction.FirepointDataModule.repo.FirepointWildlifeAffectedRepo;
import com.example.ForestFirePrediction.FirepointDataModule.repo.FirepointSpeciesDamagedRepo;
import com.example.ForestFirePrediction.FirepointDataModule.repo.FirepointWildlifeAffectedRepo;
import com.example.ForestFirePrediction.FirepointDataModule.service.FirepointDataService;
//import com.example.ForestFirePrediction.FirepointDataModule.service.FirepointSpeciesDamagedService;
//import com.example.ForestFirePrediction.FirepointDataModule.service.FirepointWildlifeAffectedService;
import com.example.ForestFirePrediction.FirepointDataModule.service.FirepointSpeciesDamagedService;
import com.example.ForestFirePrediction.FirepointDataModule.service.FirepointWildlifeAffectedService;
import com.example.ForestFirePrediction.SplData.repo.OwnerRepo;
import com.example.ForestFirePrediction.SplData.repo.SourceSystemRepo;
import com.example.ForestFirePrediction.Utility.Utility;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.jfr.ContentType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.io.IOException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor @Slf4j
public class FirepointDataController {

    private final FirepointDataService firepointDataService;
    private final FirepointSpeciesDamagedService firepointSpeciesDamagedService;
    private final FirepointWildlifeAffectedService firepointWildlifeAffectedService;

    private final FirepointDataRepository firepointDataRepository;
    private final FirepointSpeciesDamagedRepo firepointSpeciesDamagedRepo;
    private final FirepointWildlifeAffectedRepo firepointWildlifeAffectedRepo;
    private final OwnerRepo ownerRepo;
    private final SourceSystemRepo sourceSystemRepo;

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<Map<String, String>> handleException(Exception e) throws IOException {
//        Map<String, String > errorResponse = new HashMap<>();
//        errorResponse.put("message", e.getLocalizedMessage());
//        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());
//
//        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
//    }

//    @GetMapping("/count")
//    public Long getDataCount(){
//        return firepointDataService.getDataCount();
//    }

    @GetMapping
    public List<FirepointData> getData(){
        return firepointDataService.getData();
    }

    @GetMapping("/rodata")
    public ArrayList<FirepointData> getRoData(@PathParam("username") String username) {
        return (ArrayList<FirepointData>) firepointDataRepository.findAll();
    }

    @PostMapping
    public @ResponseBody ResponseEntity<FirepointDataResponse> forestFireDetails(@RequestBody FirepointDataDTO firepointDataDTO) {
        FirepointData firepointData = new FirepointData();
        log.info("{}", firepointDataDTO);
        String temp_latitude = firepointDataDTO.getLatitude();
//        double lat_deg = Double.parseDouble(temp_latitude.split(";", 3)[0]);
//        double lat_min = Double.parseDouble(temp_latitude.split(";", 3)[1]);
//        double lat_sec = Double.parseDouble(temp_latitude.split(";", 3)[2]);
//        double decimal = (lat_min/60) + (lat_sec/3600);
//        double final_latitude = lat_deg + decimal;
//        log.info(firepointDataDTO.getLATITUDE());
        firepointData.setLATITUDE(Double.parseDouble(temp_latitude));
        String temp_longitude = firepointDataDTO.getLongitude();
//        log.info(temp_longitude);
//        double long_deg = Double.parseDouble(temp_longitude.split(";", 3)[0]);
//        double long_min = Double.parseDouble(temp_longitude.split(";", 3)[1]);
//        double long_sec = Double.parseDouble(temp_longitude.split(";", 3)[2]);
//        decimal = (long_min/60) + (long_sec/3600);
//        double final_longitude = long_deg + decimal;
        firepointData.setLONGITUDE(Double.parseDouble(temp_longitude));
        firepointData.setSOURCE_SYSTEM(firepointDataDTO.getSource_system());
        firepointData.setSOURCE_SYSTEM_TYPE(firepointDataDTO.getSource_system_type());
        firepointData.setNWCG_REPORTING_AGENCY(firepointDataDTO.getNwcg_reporting_agency());
        firepointData.setNWCG_REPORTING_UNIT_ID(firepointDataDTO.getNwcg_reporting_unit_id());
        firepointData.setNWCG_REPORTING_UNIT_NAME(firepointDataDTO.getNwcg_reporting_unit_name());
        firepointData.setFIRE_YEAR(firepointDataDTO.getFire_year());
//        firepointData.set(firepointDataDTO.getRecord_type());
//        firepointData.setDISCOVERY_DATE(firepointDataDTO.getDISCOVERY_DATE());
//        firepointData.setDISCOVERY_DOY(firepointDataDTO.getDISCOVERY_DOY());
//        LocalTime time = LocalTime.parse(firepointDataDTO.getDISCOVERY_TIME());
//        firepointData.setDISCOVERY_TIME(firepointDataDTO.getDISCOVERY_TIME());
//        firepointData.setFire_control_date(firepointDataDTO.getFire_control_date());
//        LocalTime time1 = LocalTime.parse(firepointDataDTO.getFire_control_time());
//        firepointData.setFire_control_time(time1);
        firepointData.setCONT_DATE(firepointDataDTO.getCont_date());
        firepointData.setCONT_TIME(firepointDataDTO.getCont_time());
        firepointData.setSTAT_CAUSE_CODE(firepointDataDTO.getStat_cause_code());
        firepointData.setSTAT_CAUSE_DESCR(firepointDataDTO.getStat_cause_desc());
        firepointData.setCONT_DOY(firepointDataDTO.getCont_doy());
        firepointData.setCONT_DATE(firepointDataDTO.getCont_date());
        firepointData.setCONT_TIME(firepointDataDTO.getCont_time());
        firepointData.setOWNER_CODE(firepointDataDTO.getOwner_code());
        firepointData.setOWNER_DESCR(firepointDataDTO.getOwner_desc());
        firepointData.setSTATE(firepointDataDTO.getState());
        firepointData.setCOUNTY(firepointDataDTO.getCounty());
//        firepointData.setArea_damaged(firepointDataDTO.getArea_damaged());
//        log.info(firepointDataDTO.getSpecies_damaged().toString());
//        firepointDataDTO.getSpecies_damaged().forEach(species -> {
//            Species appSpecies = speciesRepo.findSpeciesByName(species.get("name"));
//            firepointData.getSpecies_damaged().add(appSpecies);
//        });
//        firepointDataDTO.getWildlife_affected().forEach(wildlife -> {
//            Wildlife appWildlife = wildlifeRepo.findWildlifeByName(wildlife.get("name"));
//            firepointData.getWildlife_affected().add(appWildlife);
//        });
//        firepointData.setPhoto_path(firepointDataDTO.getPhoto_path());
//        firepointData.setOther_info(firepointDataDTO.getOther_info());
//        firepointData.setSubmitted(firepointDataDTO.getSubmitted());
//        firepointData.setAccepted(firepointDataDTO.getAccepted());
//        firepointData.setReconsider(firepointDataDTO.getReconsider());
//        firepointData.setDivision(firepointDataDTO.getDivision());
//        firepointData.setUsername(firepointDataDTO.getUsername());

        firepointDataRepository.save(firepointData);

//        firepointDataDTO.getSpecies_damaged().forEach(species -> {
//            Species appSpecies = speciesRepo.findSpeciesByName(species.get("name"));
//            firepointSpeciesDamagedService.addTotalNum(firepointSpeciesDamagedRepo.findFSDId(firepointData.getId(), appSpecies.getId()), Integer.parseInt(species.get("total_num")));
//        });
//        firepointDataDTO.getWildlife_affected().forEach(wildlife -> {
//            Wildlife appWildlife = wildlifeRepo.findWildlifeByName(wildlife.get("name"));
//            firepointWildlifeAffectedService.addTotalNum(firepointWildlifeAffectedRepo.findFWAId(firepointData.getId(), appWildlife.getId()), Integer.parseInt(wildlife.get("total_num")));
//        });

        FirepointDataResponse firepointDataResponse = new FirepointDataResponse(firepointData);

        return new ResponseEntity<FirepointDataResponse>(
                firepointDataResponse
                , HttpStatus.ACCEPTED);
    }

//    @PutMapping()
//    public ResponseEntity<List<FirepointData>> updateDataEntry(@RequestBody List<FirepointDataDTO> firepointDataDTOList) {
//        List<FirepointData> updatedData =  firepointDataDTOList.stream().map(data -> firepointDataService.updateData(data, data.getId())).collect(Collectors.toList());
//        return new ResponseEntity<List<FirepointData>>(updatedData, HttpStatus.ACCEPTED);
//    }

//    @GetMapping("/do/data")
//    public ResponseEntity<List<FirepointData>> getDoData(@PathParam("division") DivisionForm form){
//        List<FirepointData> dataEntries = firepointDataService.getDoDataEntries(form.getDivision());
//        return ResponseEntity.ok().body(dataEntries);
//    }

//    @GetMapping("/fd/{id}")
//    public ResponseEntity<FirepointDataResponse> getResData(@PathVariable("id") Long id){
//        return ResponseEntity.ok().body(firepointDataService.getResData(id));
//    }

//    @GetMapping("/fd/list/ro")
//    public ResponseEntity<List<FirepointDataResponse>> getRoResDataList(@PathParam("username") String username){
//        System.out.println(firepointDataService.getRoResDataList(username));
//        return ResponseEntity.ok().body(firepointDataService.getRoResDataList(username));
//    }
//
//    @GetMapping("/fd/list/do")
//    public ResponseEntity<List<FirepointDataResponse>> getDoResDataList(@PathParam("division") String division){
//        return ResponseEntity.ok().body(firepointDataService.getDoResDataList(division));
//    }
}
