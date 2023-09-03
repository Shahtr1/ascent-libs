package com.ascent.business.service;

import com.ascent.business.service.dto.AppPropertiesDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ascent.business.domain.AppProperties}.
 */
public interface AppPropertiesService {
    /**
     * Save a appProperties.
     *
     * @param appPropertiesDTO the entity to save.
     * @return the persisted entity.
     */
    AppPropertiesDTO save(AppPropertiesDTO appPropertiesDTO);

    /**
     * Updates a appProperties.
     *
     * @param appPropertiesDTO the entity to update.
     * @return the persisted entity.
     */
    AppPropertiesDTO update(AppPropertiesDTO appPropertiesDTO);

    /**
     * Partially updates a appProperties.
     *
     * @param appPropertiesDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AppPropertiesDTO> partialUpdate(AppPropertiesDTO appPropertiesDTO);

    /**
     * Get all the appProperties.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AppPropertiesDTO> findAll(Pageable pageable);

    /**
     * Get the "id" appProperties.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppPropertiesDTO> findOne(Long id);

    /**
     * Delete the "id" appProperties.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
