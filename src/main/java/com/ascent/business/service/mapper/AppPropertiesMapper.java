package com.ascent.business.service.mapper;

import com.ascent.business.domain.AppProperties;
import com.ascent.business.service.dto.AppPropertiesDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppProperties} and its DTO {@link AppPropertiesDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppPropertiesMapper extends EntityMapper<AppPropertiesDTO, AppProperties> {}
