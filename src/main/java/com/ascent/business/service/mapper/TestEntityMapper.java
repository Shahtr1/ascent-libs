package com.ascent.business.service.mapper;

import com.ascent.business.domain.TestEntity;
import com.ascent.business.service.dto.TestEntityDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TestEntity} and its DTO {@link TestEntityDTO}.
 */
@Mapper(componentModel = "spring")
public interface TestEntityMapper extends EntityMapper<TestEntityDTO, TestEntity> {}
