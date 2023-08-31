package com.ascent.business.service;

import com.ascent.business.service.dto.AppLanguageDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ascent.business.domain.AppLanguage}.
 */
public interface AppLanguageService {
    /**
     * Save a appLanguage.
     *
     * @param appLanguageDTO the entity to save.
     * @return the persisted entity.
     */
    AppLanguageDTO save(AppLanguageDTO appLanguageDTO);

    /**
     * Updates a appLanguage.
     *
     * @param appLanguageDTO the entity to update.
     * @return the persisted entity.
     */
    AppLanguageDTO update(AppLanguageDTO appLanguageDTO);

    /**
     * Partially updates a appLanguage.
     *
     * @param appLanguageDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AppLanguageDTO> partialUpdate(AppLanguageDTO appLanguageDTO);

    /**
     * Get all the appLanguages.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AppLanguageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" appLanguage.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AppLanguageDTO> findOne(Long id);

    /**
     * Delete the "id" appLanguage.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
