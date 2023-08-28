package com.ascent.business.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TestEntityMapperTest {

    private TestEntityMapper testEntityMapper;

    @BeforeEach
    public void setUp() {
        testEntityMapper = new TestEntityMapperImpl();
    }
}
