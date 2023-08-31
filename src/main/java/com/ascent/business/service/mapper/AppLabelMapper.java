package com.ascent.business.service.mapper;

import com.ascent.business.domain.AppLabel;
import com.ascent.business.domain.AppLanguage;
import com.ascent.business.service.dto.AppLabelDTO;
import com.ascent.business.service.dto.AppLanguageDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppLabel} and its DTO {@link AppLabelDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppLabelMapper extends EntityMapper<AppLabelDTO, AppLabel> {
    @Mapping(target = "language", source = "language", qualifiedByName = "appLanguageId")
    AppLabelDTO toDto(AppLabel s);

    @Named("appLanguageId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppLanguageDTO toDtoAppLanguageId(AppLanguage appLanguage);
}
