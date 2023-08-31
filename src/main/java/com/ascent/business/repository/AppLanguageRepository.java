package com.ascent.business.repository;

import com.ascent.business.domain.AppLanguage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppLanguage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppLanguageRepository extends JpaRepository<AppLanguage, Long>, JpaSpecificationExecutor<AppLanguage> {}
