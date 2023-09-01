package com.ascent.business.service.mapper;

import com.ascent.business.domain.ClientAccount;
import com.ascent.business.service.dto.ClientAccountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ClientAccount} and its DTO {@link ClientAccountDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClientAccountMapper extends EntityMapper<ClientAccountDTO, ClientAccount> {}
