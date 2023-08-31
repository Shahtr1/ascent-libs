package com.ascent.business.web.rest;

import com.ascent.business.repository.AppBaseTableRepository;
import com.ascent.business.service.AppBaseTableQueryService;
import com.ascent.business.service.AppBaseTableService;
import com.ascent.business.service.criteria.AppBaseTableCriteria;
import com.ascent.business.service.dto.AppBaseTableDTO;
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
 * REST controller for managing {@link com.ascent.business.domain.AppBaseTable}.
 */
@RestController
@RequestMapping("/api")
public class AppBaseTableResource {

    private final Logger log = LoggerFactory.getLogger(AppBaseTableResource.class);

    private static final String ENTITY_NAME = "appBaseTable";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppBaseTableService appBaseTableService;

    private final AppBaseTableRepository appBaseTableRepository;

    private final AppBaseTableQueryService appBaseTableQueryService;

    public AppBaseTableResource(
        AppBaseTableService appBaseTableService,
        AppBaseTableRepository appBaseTableRepository,
        AppBaseTableQueryService appBaseTableQueryService
    ) {
        this.appBaseTableService = appBaseTableService;
        this.appBaseTableRepository = appBaseTableRepository;
        this.appBaseTableQueryService = appBaseTableQueryService;
    }

    /**
     * {@code POST  /app-base-tables} : Create a new appBaseTable.
     *
     * @param appBaseTableDTO the appBaseTableDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appBaseTableDTO, or with status {@code 400 (Bad Request)} if the appBaseTable has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/app-base-tables")
    public ResponseEntity<AppBaseTableDTO> createAppBaseTable(@Valid @RequestBody AppBaseTableDTO appBaseTableDTO)
        throws URISyntaxException {
        log.debug("REST request to save AppBaseTable : {}", appBaseTableDTO);
        if (appBaseTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new appBaseTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppBaseTableDTO result = appBaseTableService.save(appBaseTableDTO);
        return ResponseEntity
            .created(new URI("/api/app-base-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /app-base-tables/:id} : Updates an existing appBaseTable.
     *
     * @param id the id of the appBaseTableDTO to save.
     * @param appBaseTableDTO the appBaseTableDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appBaseTableDTO,
     * or with status {@code 400 (Bad Request)} if the appBaseTableDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appBaseTableDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/app-base-tables/{id}")
    public ResponseEntity<AppBaseTableDTO> updateAppBaseTable(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AppBaseTableDTO appBaseTableDTO
    ) throws URISyntaxException {
        log.debug("REST request to update AppBaseTable : {}, {}", id, appBaseTableDTO);
        if (appBaseTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, appBaseTableDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!appBaseTableRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AppBaseTableDTO result = appBaseTableService.update(appBaseTableDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appBaseTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /app-base-tables/:id} : Partial updates given fields of an existing appBaseTable, field will ignore if it is null
     *
     * @param id the id of the appBaseTableDTO to save.
     * @param appBaseTableDTO the appBaseTableDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appBaseTableDTO,
     * or with status {@code 400 (Bad Request)} if the appBaseTableDTO is not valid,
     * or with status {@code 404 (Not Found)} if the appBaseTableDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the appBaseTableDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/app-base-tables/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AppBaseTableDTO> partialUpdateAppBaseTable(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AppBaseTableDTO appBaseTableDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update AppBaseTable partially : {}, {}", id, appBaseTableDTO);
        if (appBaseTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, appBaseTableDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!appBaseTableRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AppBaseTableDTO> result = appBaseTableService.partialUpdate(appBaseTableDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appBaseTableDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /app-base-tables} : get all the appBaseTables.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appBaseTables in body.
     */
    @GetMapping("/app-base-tables")
    public ResponseEntity<List<AppBaseTableDTO>> getAllAppBaseTables(
        AppBaseTableCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get AppBaseTables by criteria: {}", criteria);
        Page<AppBaseTableDTO> page = appBaseTableQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /app-base-tables/count} : count all the appBaseTables.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/app-base-tables/count")
    public ResponseEntity<Long> countAppBaseTables(AppBaseTableCriteria criteria) {
        log.debug("REST request to count AppBaseTables by criteria: {}", criteria);
        return ResponseEntity.ok().body(appBaseTableQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /app-base-tables/:id} : get the "id" appBaseTable.
     *
     * @param id the id of the appBaseTableDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appBaseTableDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/app-base-tables/{id}")
    public ResponseEntity<AppBaseTableDTO> getAppBaseTable(@PathVariable Long id) {
        log.debug("REST request to get AppBaseTable : {}", id);
        Optional<AppBaseTableDTO> appBaseTableDTO = appBaseTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(appBaseTableDTO);
    }

    /**
     * {@code DELETE  /app-base-tables/:id} : delete the "id" appBaseTable.
     *
     * @param id the id of the appBaseTableDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/app-base-tables/{id}")
    public ResponseEntity<Void> deleteAppBaseTable(@PathVariable Long id) {
        log.debug("REST request to delete AppBaseTable : {}", id);
        appBaseTableService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
