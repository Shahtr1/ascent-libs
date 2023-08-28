package com.ascent.business.service;

import com.ascent.business.service.dto.TestEntityDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ascent.business.domain.TestEntity}.
 */
public interface TestEntityService {
    /**
     * Save a testEntity.
     *
     * @param testEntityDTO the entity to save.
     * @return the persisted entity.
     */
    TestEntityDTO save(TestEntityDTO testEntityDTO);

    /**
     * Updates a testEntity.
     *
     * @param testEntityDTO the entity to update.
     * @return the persisted entity.
     */
    TestEntityDTO update(TestEntityDTO testEntityDTO);

    /**
     * Partially updates a testEntity.
     *
     * @param testEntityDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TestEntityDTO> partialUpdate(TestEntityDTO testEntityDTO);

    /**
     * Get all the testEntities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TestEntityDTO> findAll(Pageable pageable);

    /**
     * Get the "id" testEntity.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TestEntityDTO> findOne(Long id);

    /**
     * Delete the "id" testEntity.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
