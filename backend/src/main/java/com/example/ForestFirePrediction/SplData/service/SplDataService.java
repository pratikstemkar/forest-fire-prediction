package com.example.ForestFirePrediction.SplData.service;

import com.example.ForestFirePrediction.SplData.model.*;

import javax.transaction.Transactional;
import java.util.List;

public interface SplDataService {

    //    NWCG Reporting
    NWCGReporting getNWCGReporting(String nwcgReportingName);
    List<NWCGReporting> getNWCGReportingList();
    NWCGReporting saveNWCGReporting(NWCGReporting nwcgReporting);
    void updateNWCGReporting(NWCGReporting nwcgReporting);
    void deleteNWCGReporting(String nwcgReportingName);

    //    FIRE SIZE
    FireSize getFireSize(String fireSizeName);
    List<FireSize> getFireSizeList();
    FireSize saveFireSize(FireSize fireSizee);
    void updateFireSize(FireSize fireSizee);
    void deleteFireSize(String fireSizeName);

    //    FIRE CAUSE
    FireCause getFireCause(String fireCauseName);
    List<FireCause> getFireCauseList();
    FireCause saveFireCause(FireCause fireCause);
    void updateFireCause(FireCause fireCause);
    void deleteFireCause(String fireCauseName);

    //    OWNER
    Owner getOwner(String ownerName);

    void deleteSourceSystemType(String sourceSystemTypeName);

    List<Owner> getOwnerList();
    Owner saveOwner(Owner owner);
    void updateOwner(Owner owner);
    void deleteOwner(String ownerName);

    List<SourceSystemType> getSourceSystemTypeList();

    //    SOURCE SYSTEM
    SourceSystem getSourceSystem(String sourceSystemName);
    List<SourceSystem> getSourceSystemList();

    SourceSystemType getSourceSystemType(String sourceSystemTypeName);

    SourceSystem saveSourceSystem(SourceSystem sourceSystem);

    SourceSystemType saveSourceSystemType(SourceSystemType sourceSystemType);

    void updateSourceSystem(SourceSystem sourceSystem);

    @Transactional
    void updateSourceSystemType(SourceSystemType sourceSystemType);

    void deleteSourceSystem(String sourceSystemName);
}
