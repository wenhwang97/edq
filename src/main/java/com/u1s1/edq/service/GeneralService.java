package com.u1s1.edq.service;

import com.u1s1.edq.service.cache.CachedContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeneralService {
    private CachedContainer cachedContainer;

    @Autowired
    public GeneralService(CachedContainer cachedContainer) {
        this.cachedContainer = cachedContainer;
    }

}
