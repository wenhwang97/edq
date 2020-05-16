package com.u1s1.edq.service;

import com.u1s1.edq.repository.CorrectionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CorrectionLogService {

    private CorrectionLogRepository correctionLogRepo;

    @Autowired
    public CorrectionLogService(CorrectionLogRepository correctionLogRepo) {
        this.correctionLogRepo = correctionLogRepo;
    }
}
