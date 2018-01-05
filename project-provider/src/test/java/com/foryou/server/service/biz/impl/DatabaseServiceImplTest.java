package com.foryou.server.service.biz.impl;

import com.foryou.server.ApplicationTests;
import com.foryou.server.service.biz.DatabaseService;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.Assert.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DatabaseServiceImplTest extends ApplicationTests {

    @Autowired
    private DatabaseService databaseService;

    @Test
    public void test01_getDatabaseName() throws Exception {
        String defaultDatabaseName = databaseService.getDatabaseName();
        assertNotNull(defaultDatabaseName);

        logger.info("\ndatabaseName = {}", defaultDatabaseName);
    }
}