package com.ascent.business.repository;

import com.ascent.business.domain.AppLabel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppLabel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppLabelRepository extends JpaRepository<AppLabel, Long>, JpaSpecificationExecutor<AppLabel> {}
