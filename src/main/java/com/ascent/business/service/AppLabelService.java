package com.ascent.business.service;

import com.ascent.business.service.dto.AppLabelDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ascent.business.domain.AppLabel}.
 */
public interface AppLabelService {
    /**
     * Save a appLabel.
     *
     * @param appLabelDTO the entity to save.
     * @return the persisted entity.
     */
    AppLabelDTO save(AppLabelDTO appLabelDTO);

    /**
     * Updates a appLabel.
     *
     * @param appLabelDTO the entity to update.
     * @return the persisted entity.
     */
    AppLabelDTO update(AppLabelDTO appLabelDTO);

    /**
     * Partially updates a appLabel.
     *
     * @param appLabelDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AppLabelDTO> partialUpdate(AppLabelDTO appLabelDTO);

    /**
     * Get all the appLabels.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AppLabelDTO> findAll(Pageable pageable);

    /**
     * Get the "id" appLabel.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppLabelDTO> findOne(Long id);

    /**
     * Delete the "id" appLabel.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
