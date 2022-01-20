package com.example.ForestFirePrediction.SplData.service;

import com.example.ForestFirePrediction.SplData.model.*;

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
    List<Owner> getOwnerList();
    Owner saveOwner(Owner owner);
    void updateOwner(Owner owner);
    void deleteOwner(String ownerName);

    //    SOURCE SYSTEM
    SourceSystem getSourceSystem(String sourceSystemName);
    List<SourceSystem> getSourceSystemList();
    SourceSystem saveSourceSystem(SourceSystem sourceSystem);
    void updateSourceSystem(SourceSystem sourceSystem);
    void deleteSourceSystem(String sourceSystemName);
}
