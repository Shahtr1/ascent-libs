package com.ascent.business.service;

import com.ascent.business.service.dto.ClientAccountDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.ascent.business.domain.ClientAccount}.
 */
public interface ClientAccountService {
    /**
     * Save a clientAccount.
     *
     * @param clientAccountDTO the entity to save.
     * @return the persisted entity.
     */
    ClientAccountDTO save(ClientAccountDTO clientAccountDTO);

    /**
     * Updates a clientAccount.
     *
     * @param clientAccountDTO the entity to update.
     * @return the persisted entity.
     */
    ClientAccountDTO update(ClientAccountDTO clientAccountDTO);

    /**
     * Partially updates a clientAccount.
     *
     * @param clientAccountDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ClientAccountDTO> partialUpdate(ClientAccountDTO clientAccountDTO);

    /**
     * Get all the clientAccounts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ClientAccountDTO> findAll(Pageable pageable);

    /**
     * Get the "id" clientAccount.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ClientAccountDTO> findOne(Long id);

    /**
     * Delete the "id" clientAccount.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
