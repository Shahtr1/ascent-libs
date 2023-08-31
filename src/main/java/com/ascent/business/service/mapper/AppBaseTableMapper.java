package com.ascent.business.service.mapper;

import com.ascent.business.domain.AppBaseTable;
import com.ascent.business.service.dto.AppBaseTableDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppBaseTable} and its DTO {@link AppBaseTableDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppBaseTableMapper extends EntityMapper<AppBaseTableDTO, AppBaseTable> {}
