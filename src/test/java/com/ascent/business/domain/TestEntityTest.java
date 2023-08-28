package com.ascent.business.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ascent.business.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TestEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestEntity.class);
        TestEntity testEntity1 = new TestEntity();
        testEntity1.setId(1L);
        TestEntity testEntity2 = new TestEntity();
        testEntity2.setId(testEntity1.getId());
        assertThat(testEntity1).isEqualTo(testEntity2);
        testEntity2.setId(2L);
        assertThat(testEntity1).isNotEqualTo(testEntity2);
        testEntity1.setId(null);
        assertThat(testEntity1).isNotEqualTo(testEntity2);
    }
}
