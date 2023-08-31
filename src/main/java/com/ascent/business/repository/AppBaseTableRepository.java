package com.ascent.business.repository;

import com.ascent.business.domain.AppBaseTable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppBaseTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppBaseTableRepository extends JpaRepository<AppBaseTable, Long>, JpaSpecificationExecutor<AppBaseTable> {}
