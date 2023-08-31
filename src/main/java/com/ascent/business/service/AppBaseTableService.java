package com.ascent.business.service;

import com.ascent.business.service.dto.AppBaseTableDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ascent.business.domain.AppBaseTable}.
 */
public interface AppBaseTableService {
    /**
     * Save a appBaseTable.
     *
     * @param appBaseTableDTO the entity to save.
     * @return the persisted entity.
     */
    AppBaseTableDTO save(AppBaseTableDTO appBaseTableDTO);

    /**
     * Updates a appBaseTable.
     *
     * @param appBaseTableDTO the entity to update.
     * @return the persisted entity.
     */
    AppBaseTableDTO update(AppBaseTableDTO appBaseTableDTO);

    /**
     * Partially updates a appBaseTable.
     *
     * @param appBaseTableDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AppBaseTableDTO> partialUpdate(AppBaseTableDTO appBaseTableDTO);

    /**
     * Get all the appBaseTables.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AppBaseTableDTO> findAll(Pageable pageable);

    /**
     * Get the "id" appBaseTable.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppBaseTableDTO> findOne(Long id);

    /**
     * Delete the "id" appBaseTable.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
