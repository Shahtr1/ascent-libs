package com.ascent.business.repository;

import com.ascent.business.domain.AppProperties;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppProperties entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppPropertiesRepository extends JpaRepository<AppProperties, Long>, JpaSpecificationExecutor<AppProperties> {}
