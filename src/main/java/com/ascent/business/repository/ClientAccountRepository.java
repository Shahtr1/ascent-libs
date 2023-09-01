package com.ascent.business.repository;

import com.ascent.business.domain.ClientAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ClientAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientAccountRepository extends JpaRepository<ClientAccount, Long>, JpaSpecificationExecutor<ClientAccount> {}
