package com.ascent.business.service.mapper;

import com.ascent.business.domain.AppLanguage;
import com.ascent.business.service.dto.AppLanguageDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppLanguage} and its DTO {@link AppLanguageDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppLanguageMapper extends EntityMapper<AppLanguageDTO, AppLanguage> {}
