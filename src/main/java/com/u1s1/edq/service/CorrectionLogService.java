package com.u1s1.edq.service;

import com.u1s1.edq.entity.CorrectionLog;
import com.u1s1.edq.entity.GeoPolygon;
import com.u1s1.edq.entity.State;
import com.u1s1.edq.enums.OperationType;
import com.u1s1.edq.repository.CorrectionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CorrectionLogService {

    private CorrectionLogRepository correctionLogRepo;

    @Autowired
    public CorrectionLogService(CorrectionLogRepository correctionLogRepo) {
        this.correctionLogRepo = correctionLogRepo;
    }

    public CorrectionLog addDataLog(State state, String precinctCName, OperationType type, String desc, String comment, LocalDateTime dateTime) {
        CorrectionLog log = new CorrectionLog();
        log.setState(state);
        log.setModifyTime(dateTime);
        log.setPrecinctCName(precinctCName);
        log.setType(type);
        log.setDescription(desc);
        log.setComment(comment);

        return correctionLogRepo.save(log);
    }

    public CorrectionLog addPolygonLog(State state, String precinctCName, OperationType type, GeoPolygon polygon0, GeoPolygon polygon1, String desc, String comment, LocalDateTime dateTime) {
        CorrectionLog log = new CorrectionLog();
        log.setState(state);
        log.setModifyTime(dateTime);
        log.setPrecinctCName(precinctCName);
        log.setType(type);
        log.setPoly_1(polygon0);
        log.setPoly_2(polygon1);
        log.setDescription(desc);
        log.setComment(comment);

        return correctionLogRepo.save(log);
    }
}
