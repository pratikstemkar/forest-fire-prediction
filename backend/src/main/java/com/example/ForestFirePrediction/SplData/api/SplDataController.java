package com.example.ForestFirePrediction.SplData.api;

import com.example.ForestFirePrediction.SplData.model.*;
import com.example.ForestFirePrediction.SplData.service.SplDataService;
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

//    ---------------------------------------- FIRE CAUSE -------------------------------------------------------------------

    //    Get FireCause List
    @GetMapping("/firecauses")
    public ResponseEntity<List<FireCause>> getFireCauseList(){
        return ResponseEntity.ok().body(splDataService.getFireCauseList());
    }

    //    Get a specific firecause
    @GetMapping("/firecause/{fireCauseName}")
    public ResponseEntity<FireCause> getFireCause(@PathVariable("fireCauseName") String fireCauseName){
        return ResponseEntity.ok().body(splDataService.getFireCause(fireCauseName));
    }

    //    Save a new FireCause
    @PostMapping("/firecause/save")
    public ResponseEntity<FireCause> saveFireCause(@RequestBody FireCause fireCause){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/security/firecause/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveFireCause(fireCause));
    }

    //    Delete a FireCause
    @DeleteMapping("/firecause/delete/{fireCauseName}")
    public ResponseEntity<?> deleteFireCause(@PathVariable("fireCauseName") String fireCauseName){
        splDataService.deleteFireCause(fireCauseName);
        return ResponseEntity.ok().body("FireCause deleted with name: " + fireCauseName);
    }

    //    Update details of a FireCause
    @PutMapping("/firecause/update")
    public ResponseEntity<?> updateFireCause(@RequestBody FireCause fireCause){
        splDataService.updateFireCause(fireCause);
        return ResponseEntity.ok().body("FireCause updated." );
    }

    //    ---------------------------------------- FIRE SIZE -------------------------------------------------------------------

    //    Get FireSize List
    @GetMapping("/firesizes")
    public ResponseEntity<List<FireSize>> getFireSizeList(){
        return ResponseEntity.ok().body(splDataService.getFireSizeList());
    }

    //    Get a specific fireSize
    @GetMapping("/firesize/{fireSizeName}")
    public ResponseEntity<FireSize> getFireSize(@PathVariable("fireSizeName") String fireSizeName){
        return ResponseEntity.ok().body(splDataService.getFireSize(fireSizeName));
    }

    //    Save a new FireSize
    @PostMapping("/firesize/save")
    public ResponseEntity<FireSize> saveFireSize(@RequestBody FireSize fireSize){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/security/firesize/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveFireSize(fireSize));
    }

    //    Delete a FireSize
    @DeleteMapping("/firesize/delete/{fireSizeName}")
    public ResponseEntity<?> deleteFireSize(@PathVariable("fireSizeName") String fireSizeName){
        splDataService.deleteFireSize(fireSizeName);
        return ResponseEntity.ok().body("FireSize deleted with name: " + fireSizeName);
    }

    //    Update details of a FireSize
    @PutMapping("/firesize/update")
    public ResponseEntity<?> updateFireSize(@RequestBody FireSize fireSize){
        splDataService.updateFireSize(fireSize);
        return ResponseEntity.ok().body("FireSize updated." );
    }

//    ---------------------------------------------- NWCG REPORTING ----------------------------------------------------------

    //    Get NWGCReporting List
    @GetMapping("/nwcgreportings")
    public ResponseEntity<List<NWCGReporting>> getNWCGReportingList(){
        return ResponseEntity.ok().body(splDataService.getNWCGReportingList());
    }

    //    Get a specific NWCGReporting
    @GetMapping("/nwcgreporting/{nwcgReportingName}")
    public ResponseEntity<NWCGReporting> getNWCGReporting(@PathVariable("nwcgReportingName") String nwcgReportingName){
        return ResponseEntity.ok().body(splDataService.getNWCGReporting(nwcgReportingName));
    }

    //    Save a new NWCGReporting
    @PostMapping("/nwcgreporting/save")
    public ResponseEntity<NWCGReporting> saveNWCGReporting(@RequestBody NWCGReporting nwcgReporting){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/security/nwcgreporting/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveNWCGReporting(nwcgReporting));
    }

    //    Delete a NWCGReporting
    @DeleteMapping("/nwcgreporting/delete/{nwcgReporting}")
    public ResponseEntity<?> deleteNWCGReporting(@PathVariable("nwcgReporting") String nwcgReporting){
        splDataService.deleteNWCGReporting(nwcgReporting);
        return ResponseEntity.ok().body("NWCGReporting deleted with name: " + nwcgReporting);
    }

    //    Update details of a NWCGReporting
    @PutMapping("/nwcgreporting/update")
    public ResponseEntity<?> updateNWCGReporting(@RequestBody NWCGReporting nwcgReporting){
        splDataService.updateNWCGReporting(nwcgReporting);
        return ResponseEntity.ok().body("NWCGReporting updated." );
    }

//    ----------------------------------------- OWNER ---------------------------------------------------------------

    //    Get all Owner
    @GetMapping("/owners")
    public ResponseEntity<List<Owner>> getOwnerList(){
        return ResponseEntity.ok().body(splDataService.getOwnerList());
    }

    //    Get a specific Owner
    @GetMapping("/owner/{ownerName}")
    public ResponseEntity<Owner> getOwner(@PathVariable("ownerName") String ownerName){
        return ResponseEntity.ok().body(splDataService.getOwner(ownerName));
    }

    //    Save a new Owner
    @PostMapping("/owner/save")
    public ResponseEntity<Owner> saveOwner(@RequestBody Owner owner){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/spldata/owner/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveOwner(owner));
    }

    //    Delete a Owner
    @DeleteMapping("/wildlife/delete/{ownerName}")
    public ResponseEntity<?> deleteOwner(@PathVariable("ownerName") String ownerName){
        splDataService.deleteOwner(ownerName);
        return ResponseEntity.ok().body("Owner deleted with name: " + ownerName);
    }

    //    Update details of a Owner
    @PutMapping("/owner/update")
    public ResponseEntity<?> updateOwner(@RequestBody Owner owner){
        splDataService.updateOwner(owner);
        return ResponseEntity.ok().body("Owner updated." );
    }

//    ------------------------------------------- SOURCE SYSTEM ---------------------------------------------------------------

    //    Get all SourceSystem
    @GetMapping("/sourcesystems")
    public ResponseEntity<List<SourceSystem>> getSourceSystem(){
        return ResponseEntity.ok().body(splDataService.getSourceSystemList());
    }

    //    Get a specific SourceSystem
    @GetMapping("/sourcesystem/{sourceSystemName}")
    public ResponseEntity<SourceSystem> getSourceSystem(@PathVariable("sourceSystemName") String sourceSystemName){
        return ResponseEntity.ok().body(splDataService.getSourceSystem(sourceSystemName));
    }

    //    Save a new SourceSystem
    @PostMapping("/sourcesystem/save")
    public ResponseEntity<SourceSystem> saveSourceSystem(@RequestBody SourceSystem sourceSystem){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/spldata/sourcesystem/save").toUriString());
        return ResponseEntity.created(uri).body(splDataService.saveSourceSystem(sourceSystem));
    }

    //    Delete a SourceSystem
    @DeleteMapping("/sourcesystem/delete/{sourceSystemName}")
    public ResponseEntity<?> deleteSourceSystem(@PathVariable("sourceSystemName") String sourceSystemName){
        splDataService.deleteSourceSystem(sourceSystemName);
        return ResponseEntity.ok().body("SourceSystem deleted with name: " + sourceSystemName);
    }

    //    Update details of a SourceSystem
    @PutMapping("/sourcesystem/update")
    public ResponseEntity<?> updateSpecies(@RequestBody SourceSystem sourceSystem){
        splDataService.updateSourceSystem(sourceSystem);
        return ResponseEntity.ok().body("SourceSystem updated." );
    }
}
