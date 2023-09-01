package com.ascent.business.web.rest;

import com.ascent.business.repository.ClientAccountRepository;
import com.ascent.business.service.ClientAccountQueryService;
import com.ascent.business.service.ClientAccountService;
import com.ascent.business.service.criteria.ClientAccountCriteria;
import com.ascent.business.service.dto.ClientAccountDTO;
import com.ascent.business.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ascent.business.domain.ClientAccount}.
 */
@RestController
@RequestMapping("/api")
public class ClientAccountResource {

    private final Logger log = LoggerFactory.getLogger(ClientAccountResource.class);

    private static final String ENTITY_NAME = "clientAccount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientAccountService clientAccountService;

    private final ClientAccountRepository clientAccountRepository;

    private final ClientAccountQueryService clientAccountQueryService;

    public ClientAccountResource(
        ClientAccountService clientAccountService,
        ClientAccountRepository clientAccountRepository,
        ClientAccountQueryService clientAccountQueryService
    ) {
        this.clientAccountService = clientAccountService;
        this.clientAccountRepository = clientAccountRepository;
        this.clientAccountQueryService = clientAccountQueryService;
    }

    /**
     * {@code POST  /client-accounts} : Create a new clientAccount.
     *
     * @param clientAccountDTO the clientAccountDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clientAccountDTO, or with status {@code 400 (Bad Request)} if the clientAccount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/client-accounts")
    public ResponseEntity<ClientAccountDTO> createClientAccount(@Valid @RequestBody ClientAccountDTO clientAccountDTO)
        throws URISyntaxException {
        log.debug("REST request to save ClientAccount : {}", clientAccountDTO);
        if (clientAccountDTO.getId() != null) {
            throw new BadRequestAlertException("A new clientAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientAccountDTO result = clientAccountService.save(clientAccountDTO);
        return ResponseEntity
            .created(new URI("/api/client-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /client-accounts/:id} : Updates an existing clientAccount.
     *
     * @param id the id of the clientAccountDTO to save.
     * @param clientAccountDTO the clientAccountDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientAccountDTO,
     * or with status {@code 400 (Bad Request)} if the clientAccountDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clientAccountDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/client-accounts/{id}")
    public ResponseEntity<ClientAccountDTO> updateClientAccount(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ClientAccountDTO clientAccountDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ClientAccount : {}, {}", id, clientAccountDTO);
        if (clientAccountDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clientAccountDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clientAccountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ClientAccountDTO result = clientAccountService.update(clientAccountDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, clientAccountDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /client-accounts/:id} : Partial updates given fields of an existing clientAccount, field will ignore if it is null
     *
     * @param id the id of the clientAccountDTO to save.
     * @param clientAccountDTO the clientAccountDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientAccountDTO,
     * or with status {@code 400 (Bad Request)} if the clientAccountDTO is not valid,
     * or with status {@code 404 (Not Found)} if the clientAccountDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the clientAccountDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/client-accounts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ClientAccountDTO> partialUpdateClientAccount(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ClientAccountDTO clientAccountDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ClientAccount partially : {}, {}", id, clientAccountDTO);
        if (clientAccountDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clientAccountDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clientAccountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ClientAccountDTO> result = clientAccountService.partialUpdate(clientAccountDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, clientAccountDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /client-accounts} : get all the clientAccounts.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clientAccounts in body.
     */
    @GetMapping("/client-accounts")
    public ResponseEntity<List<ClientAccountDTO>> getAllClientAccounts(
        ClientAccountCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get ClientAccounts by criteria: {}", criteria);
        Page<ClientAccountDTO> page = clientAccountQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /client-accounts/count} : count all the clientAccounts.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/client-accounts/count")
    public ResponseEntity<Long> countClientAccounts(ClientAccountCriteria criteria) {
        log.debug("REST request to count ClientAccounts by criteria: {}", criteria);
        return ResponseEntity.ok().body(clientAccountQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /client-accounts/:id} : get the "id" clientAccount.
     *
     * @param id the id of the clientAccountDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clientAccountDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/client-accounts/{id}")
    public ResponseEntity<ClientAccountDTO> getClientAccount(@PathVariable Long id) {
        log.debug("REST request to get ClientAccount : {}", id);
        Optional<ClientAccountDTO> clientAccountDTO = clientAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(clientAccountDTO);
    }

    /**
     * {@code DELETE  /client-accounts/:id} : delete the "id" clientAccount.
     *
     * @param id the id of the clientAccountDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/client-accounts/{id}")
    public ResponseEntity<Void> deleteClientAccount(@PathVariable Long id) {
        log.debug("REST request to delete ClientAccount : {}", id);
        clientAccountService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
