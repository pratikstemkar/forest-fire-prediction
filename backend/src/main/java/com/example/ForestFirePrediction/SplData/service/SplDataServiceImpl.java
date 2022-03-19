package com.example.ForestFirePrediction.SplData.service;

import com.example.ForestFirePrediction.SplData.model.*;
import com.example.ForestFirePrediction.SplData.repo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class SplDataServiceImpl implements SplDataService {

    private final NWCGReportingRepo NWCGReportingRepo;
    private final FireCauseRepo fireCauseRepo;
    private final FireSizeRepo fireSizeRepo;
    private final SourceSystemRepo sourceSystemRepo;
    private final SourceSystemTypeRepo sourceSystemTypeRepo;
    private final OwnerRepo ownerRepo;

//    ------------------------------------- NWCGReporting ----------------------------------------------------------------------

    @Override
    public List<NWCGReporting> getNWCGReportingList() {
        log.info("Fetching all NWCG Reporting");
        return NWCGReportingRepo.findAll();
    }

    @Override
    public NWCGReporting getNWCGReporting(String nwcgReportingName) {
        Optional<NWCGReporting> nwcgReportingByName = Optional.ofNullable(NWCGReportingRepo.findNWCGReportingByName(nwcgReportingName));
        if(!nwcgReportingByName.isPresent()){
            throw new IllegalStateException("NWCG Reporting with name: "+ nwcgReportingName +" not found.");
        }else{
            log.info("Fetching nwcg Reporting {}", nwcgReportingName);
            NWCGReporting nwcgReporting = NWCGReportingRepo.findNWCGReportingByName(nwcgReportingName);
            return nwcgReporting;
        }
    }

    @Override
    public NWCGReporting saveNWCGReporting(NWCGReporting nwcgReporting) {
        Optional<NWCGReporting> nwcgReportingByName = Optional.ofNullable(NWCGReportingRepo.findNWCGReportingByName(nwcgReporting.getName()));
        if(nwcgReportingByName.isPresent()){
            throw new IllegalStateException("NWCG Reporting Already Present.");
        }else{
            log.info("Saving new NWCG Reporting {}", nwcgReporting.getName());
            return NWCGReportingRepo.save(nwcgReporting);
        }
    }

    @Transactional @Override
    public void updateNWCGReporting(NWCGReporting nwcgReporting) {
        Optional<NWCGReporting> nwcgReportingById = NWCGReportingRepo.findById(nwcgReporting.getId());
        if(nwcgReportingById.isEmpty()){
            throw new IllegalStateException("NWCGReporting does not exist.");
        }else{
            log.info("Updating NWCGReporting {}", nwcgReporting.getId());
            NWCGReporting appNWCGReporting = NWCGReportingRepo.findNWCGReportingById(nwcgReporting.getId());

            if(nwcgReporting.getName() != null && !Objects.equals(nwcgReporting.getName(), appNWCGReporting.getName())){
                appNWCGReporting.setName(nwcgReporting.getName());
            }
            if(nwcgReporting.getAgency() != null && !Objects.equals(nwcgReporting.getAgency(), appNWCGReporting.getAgency())){
                appNWCGReporting.setAgency(nwcgReporting.getAgency());
            }
            if(nwcgReporting.getImg() != null && !Objects.equals(nwcgReporting.getImg(), appNWCGReporting.getImg())){
                appNWCGReporting.setImg(nwcgReporting.getImg());
            }
        }
    }

    @Override
    public void deleteNWCGReporting(String nwcgReportingName) {
        Optional<NWCGReporting> nwcgReportingByName = Optional.ofNullable(NWCGReportingRepo.findNWCGReportingByName(nwcgReportingName));
        if(!nwcgReportingByName.isPresent()){
            throw new IllegalStateException("NWCGReporting with name: " + nwcgReportingName + " does not exist.");
        }else{
            log.info("Deleting NWCGReporting: {}", nwcgReportingName);
            NWCGReporting nwcgReporting = NWCGReportingRepo.findNWCGReportingByName(nwcgReportingName);
            NWCGReportingRepo.delete(nwcgReporting);
        }
    }

//    --------------------------------------------- FIRE CAUSE -----------------------------------------------------------

    @Override
    public List<FireCause> getFireCauseList() {
        log.info("Fetching all FireCauses");
        return fireCauseRepo.findAll();
    }

    @Override
    public FireCause getFireCause(String fireCauseName) {
        Optional<FireCause> fireCauseByName = Optional.ofNullable(fireCauseRepo.findFireCauseByName(fireCauseName));
        if(fireCauseByName.isEmpty()){
            throw new IllegalStateException("FireCause with name: "+ fireCauseName +" not found.");
        }else{
            log.info("Fetching FireCause {}", fireCauseName);
            FireCause fireCause = fireCauseRepo.findFireCauseByName(fireCauseName);
            return fireCause;
        }
    }

    @Override
    public FireCause saveFireCause(FireCause fireCause) {
        Optional<FireCause> fireCauseByName = Optional.ofNullable(fireCauseRepo.findFireCauseByName(fireCause.getName()));
        if(fireCauseByName.isPresent()){
            throw new IllegalStateException("FireCause Already Present.");
        }else{
            log.info("Saving new FireCause {}", fireCause.getName());
            return fireCauseRepo.save(fireCause);
        }
    }

    @Transactional @Override
    public void updateFireCause(FireCause fireCause) {
        Optional<FireCause> fireCauseById = fireCauseRepo.findById(fireCause.getId());
        if(fireCauseById.isEmpty()){
            throw new IllegalStateException("FireCause does not exist.");
        }else{
            log.info("Updating FireCause {}", fireCause.getId());
            FireCause appFireCause = fireCauseRepo.findFireCauseById(fireCause.getId());

            if(fireCause.getName() != null && !Objects.equals(fireCause.getName(), appFireCause.getName())){
                appFireCause.setName(fireCause.getName());
            }
            if(fireCause.getImg() != null && !Objects.equals(fireCause.getImg(), appFireCause.getImg())){
                appFireCause.setImg(fireCause.getImg());
            }
        }
    }

    @Override
    public void deleteFireCause(String fireCauseName) {
        Optional<FireCause> fireCauseByName = Optional.ofNullable(fireCauseRepo.findFireCauseByName(fireCauseName));
        if(fireCauseByName.isEmpty()){
            throw new IllegalStateException("FireCause with name: " + fireCauseName + " does not exist.");
        }else{
            log.info("Deleting FireCause: {}", fireCauseByName);
            FireCause fireCause = fireCauseRepo.findFireCauseByName(fireCauseName);
            fireCauseRepo.delete(fireCause);
        }
    }

    //    --------------------------------------------- FIRE SIZE -----------------------------------------------------------

    @Override
    public List<FireSize> getFireSizeList() {
        log.info("Fetching all FireSizes");
        return fireSizeRepo.findAll();
    }

    @Override
    public FireSize getFireSize(String fireSizeName) {
        Optional<FireSize> fireSizeByName = Optional.ofNullable(fireSizeRepo.findFireSizeByGrade(fireSizeName));
        if(fireSizeByName.isEmpty()){
            throw new IllegalStateException("FireSize with name: "+ fireSizeName +" not found.");
        }else{
            log.info("Fetching FireSize {}", fireSizeName);
            FireSize fireSize = fireSizeRepo.findFireSizeByGrade(fireSizeName);
            return fireSize;
        }
    }

    @Override
    public FireSize saveFireSize(FireSize fireSize) {
        Optional<FireSize> fireSizeByName = Optional.ofNullable(fireSizeRepo.findFireSizeByGrade(fireSize.getGrade()));
        if(fireSizeByName.isPresent()){
            throw new IllegalStateException("FireSize Already Present.");
        }else{
            log.info("Saving new FireSize {}", fireSize.getGrade());
            return fireSizeRepo.save(fireSize);
        }
    }

    @Transactional @Override
    public void updateFireSize(FireSize fireSize) {
        Optional<FireSize> fireSizeById = fireSizeRepo.findById(fireSize.getId());
        if(fireSizeById.isEmpty()){
            throw new IllegalStateException("FireSize does not exist.");
        }else{
            log.info("Updating FireSize {}", fireSize.getId());
            FireSize appFireSize = fireSizeRepo.findFireSizeById(fireSize.getId());

            if(fireSize.getGrade() != null && !Objects.equals(fireSize.getGrade(), appFireSize.getGrade())){
                appFireSize.setGrade(fireSize.getGrade());
            }
            if(fireSize.getSize() != null && !Objects.equals(fireSize.getSize(), appFireSize.getSize())){
                appFireSize.setSize(fireSize.getSize());
            }
            if(fireSize.getImg() != null && !Objects.equals(fireSize.getImg(), appFireSize.getImg())){
                appFireSize.setImg(fireSize.getImg());
            }
        }
    }

    @Override
    public void deleteFireSize(String fireSizeName) {
        Optional<FireSize> fireSizeByName = Optional.ofNullable(fireSizeRepo.findFireSizeByGrade(fireSizeName));
        if(fireSizeByName.isEmpty()){
            throw new IllegalStateException("FireSize with name: " + fireSizeName + " does not exist.");
        }else{
            log.info("Deleting FireSize: {}", fireSizeByName);
            FireSize fireSize = fireSizeRepo.findFireSizeByGrade(fireSizeName);
            fireSizeRepo.delete(fireSize);
        }
    }

//    ------------------------------------- SOURCE SYSTEM -------------------------------------------------------------------

    @Override
    public List<SourceSystem> getSourceSystemList(){
        log.info("Fetching all SourceSystem List...");
        return sourceSystemRepo.findAll();
    }

    @Override
    public SourceSystem getSourceSystem(String sourceSystemName) {
        Optional<SourceSystem> sourceSystemByName = Optional.ofNullable(sourceSystemRepo.findSourceSystemByName(sourceSystemName));
        if(sourceSystemByName.isEmpty()){
            throw new IllegalStateException("SourceSystem with name: "+ sourceSystemName +" not found.");
        }else{
            log.info("Fetching SourceSystem {}...", sourceSystemName);
            SourceSystem sourceSystem = sourceSystemRepo.findSourceSystemByName(sourceSystemName);
            return sourceSystem;
        }
    }

    @Override
    public SourceSystem saveSourceSystem(SourceSystem sourceSystem) {
        Optional<SourceSystem> sourceSystemByName = Optional.ofNullable(sourceSystemRepo.findSourceSystemByName(sourceSystem.getName()));
        if(sourceSystemByName.isPresent()){
            throw new IllegalStateException("SourceSystem "+ sourceSystem.getName() +" Already Present.");
        }else{
            log.info("Saving new SourceSystem {}", sourceSystem.getName());
            return sourceSystemRepo.save(sourceSystem);
        }
    }

    @Transactional @Override
    public void updateSourceSystem(SourceSystem sourceSystem) {
        Optional<SourceSystem> sourceSystemById = sourceSystemRepo.findById(sourceSystem.getId());
        if(sourceSystemById.isEmpty()){
            throw new IllegalStateException("SourceSystem "+sourceSystem.getName()+" does not exist.");
        }else{
            log.info("Updating SourceSystem: {}...", sourceSystem.getId());
            SourceSystem appSourceSystem = sourceSystemRepo.findSourceSystemById(sourceSystem.getId());

            if(sourceSystem.getName() != null && !Objects.equals(sourceSystem.getName(), sourceSystem.getName())){
                appSourceSystem.setName(sourceSystem.getName());
            }
            if(sourceSystem.getType() != null && !Objects.equals(sourceSystem.getType(), appSourceSystem.getType())){
                appSourceSystem.setType(sourceSystem.getType());
            }
            if(sourceSystem.getImg() != null && !Objects.equals(sourceSystem.getImg(), appSourceSystem.getImg())){
                appSourceSystem.setImg(sourceSystem.getImg());
            }
        }
    }

    @Override
    public void deleteSourceSystem(String sourceSystemName) {
        Optional<SourceSystem> sourceSystemByName = Optional.ofNullable(sourceSystemRepo.findSourceSystemByName(sourceSystemName));
        if(sourceSystemByName.isEmpty()){
            throw new IllegalStateException("SourceSystem with name: " + sourceSystemName + " does not exist.");
        }else{
            log.info("Deleting SourceSystem: {}...", sourceSystemByName);
            SourceSystem sourceSystem = sourceSystemRepo.findSourceSystemByName(sourceSystemName);
            sourceSystemRepo.delete(sourceSystem);
        }
    }

    //    ------------------------------------- SOURCE SYSTEM TYPE -------------------------------------------------------------------

    @Override
    public List<SourceSystemType> getSourceSystemTypeList(){
        log.info("Fetching all SourceSystemType List...");
        return sourceSystemTypeRepo.findAll();
    }

    @Override
    public SourceSystemType getSourceSystemType(String sourceSystemTypeName) {
        Optional<SourceSystemType> sourceSystemTypeByName = Optional.ofNullable(sourceSystemTypeRepo.findSourceSystemTypeByName(sourceSystemTypeName));
        if(sourceSystemTypeByName.isEmpty()){
            throw new IllegalStateException("SourceSystemType with name: "+ sourceSystemTypeName +" not found.");
        }else{
            log.info("Fetching SourceSystemType {}...", sourceSystemTypeName);
            SourceSystemType sourceSystemType = sourceSystemTypeRepo.findSourceSystemTypeByName(sourceSystemTypeName);
            return sourceSystemType;
        }
    }

    @Override
    public SourceSystemType saveSourceSystemType(SourceSystemType sourceSystemType) {
        Optional<SourceSystemType> sourceSystemTypeByName = Optional.ofNullable(sourceSystemTypeRepo.findSourceSystemTypeByName(sourceSystemType.getName()));
        if(sourceSystemTypeByName.isPresent()){
            throw new IllegalStateException("SourceSystemType "+ sourceSystemType.getName() +" Already Present.");
        }else{
            log.info("Saving new SourceSystemType {}", sourceSystemType.getName());
            return sourceSystemTypeRepo.save(sourceSystemType);
        }
    }

    @Transactional @Override
    public void updateSourceSystemType(SourceSystemType sourceSystemType) {
        Optional<SourceSystemType> sourceSystemTypeById = sourceSystemTypeRepo.findById(sourceSystemType.getId());
        if(sourceSystemTypeById.isEmpty()){
            throw new IllegalStateException("SourceSystemType "+sourceSystemType.getName()+" does not exist.");
        }else{
            log.info("Updating SourceSystemType: {}...", sourceSystemType.getId());
            SourceSystemType appSourceSystemType = sourceSystemTypeRepo.findSourceSystemTypeById(sourceSystemType.getId());

            if(sourceSystemType.getName() != null && !Objects.equals(sourceSystemType.getName(), sourceSystemType.getName())){
                appSourceSystemType.setName(sourceSystemType.getName());
            }
            if(sourceSystemType.getDescription() != null && !Objects.equals(sourceSystemType.getDescription(), appSourceSystemType.getDescription())){
                appSourceSystemType.setDescription(sourceSystemType.getDescription());
            }
            if(sourceSystemType.getImg() != null && !Objects.equals(sourceSystemType.getImg(), appSourceSystemType.getImg())){
                appSourceSystemType.setImg(sourceSystemType.getImg());
            }
        }
    }

    @Override
    public void deleteSourceSystemType(String sourceSystemTypeName) {
        Optional<SourceSystemType> sourceSystemTypeByName = Optional.ofNullable(sourceSystemTypeRepo.findSourceSystemTypeByName(sourceSystemTypeName));
        if(sourceSystemTypeByName.isEmpty()){
            throw new IllegalStateException("SourceSystemType with name: " + sourceSystemTypeName + " does not exist.");
        }else{
            log.info("Deleting SourceSystemType: {}...", sourceSystemTypeByName);
            SourceSystemType sourceSystemType = sourceSystemTypeRepo.findSourceSystemTypeByName(sourceSystemTypeName);
            sourceSystemTypeRepo.delete(sourceSystemType);
        }
    }

//    ------------------------------------------ OWNER ----------------------------------------------------------------

    @Override
    public List<Owner> getOwnerList(){
        log.info("Fetching all Owner...");
        return ownerRepo.findAll();
    }

    @Override
    public Owner getOwner(String ownerName) {
        Optional<Owner> ownerByName = Optional.ofNullable(ownerRepo.findOwnerByName(ownerName));
        if(ownerByName.isEmpty()){
            throw new IllegalStateException("Owner with name: "+ ownerName +" not found.");
        }else{
            log.info("Fetching Owner {}...", ownerName);
            Owner owner = ownerRepo.findOwnerByName(ownerName);
            return owner;
        }
    }

    @Override
    public Owner saveOwner(Owner owner) {
        Optional<Owner> ownerByName = Optional.ofNullable(ownerRepo.findOwnerByName(owner.getName()));
        if(ownerByName.isPresent()){
            throw new IllegalStateException("Owner "+ owner.getName() +" Already Present.");
        }else{
            log.info("Saving new Owner {}", owner.getName());
            return ownerRepo.save(owner);
        }
    }

    @Transactional @Override
    public void updateOwner(Owner owner) {
        Optional<Owner> ownerById = ownerRepo.findById(owner.getId());
        if(ownerById.isEmpty()){
            throw new IllegalStateException("Owner "+ owner.getName() +" does not exist.");
        }else{
            log.info("Updating Owner: {}...", owner.getId());
            Owner appOwner = ownerRepo.findOwnerById(owner.getId());

            if(owner.getName() != null && !Objects.equals(owner.getName(), appOwner.getName())){
                appOwner.setName(owner.getName());
            }
            if(owner.getImg() != null && !Objects.equals(owner.getImg(), appOwner.getImg())){
                appOwner.setImg(owner.getImg());
            }
        }
    }

    @Override
    public void deleteOwner(String ownerName) {
        Optional<Owner> ownerByName = Optional.ofNullable(ownerRepo.findOwnerByName(ownerName));
        if(ownerByName.isEmpty()){
            throw new IllegalStateException("Owner with name: " + ownerName + " does not exist.");
        }else{
            log.info("Deleting Owner: {}...", ownerByName);
            Owner owner = ownerRepo.findOwnerByName(ownerName);
            ownerRepo.delete(owner);
        }
    }
}
