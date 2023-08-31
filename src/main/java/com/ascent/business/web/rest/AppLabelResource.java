package com.ascent.business.web.rest;

import com.ascent.business.repository.AppLabelRepository;
import com.ascent.business.service.AppLabelQueryService;
import com.ascent.business.service.AppLabelService;
import com.ascent.business.service.criteria.AppLabelCriteria;
import com.ascent.business.service.dto.AppLabelDTO;
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
 * REST controller for managing {@link com.ascent.business.domain.AppLabel}.
 */
@RestController
@RequestMapping("/api")
public class AppLabelResource {

    private final Logger log = LoggerFactory.getLogger(AppLabelResource.class);

    private static final String ENTITY_NAME = "appLabel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppLabelService appLabelService;

    private final AppLabelRepository appLabelRepository;

    private final AppLabelQueryService appLabelQueryService;

    public AppLabelResource(
        AppLabelService appLabelService,
        AppLabelRepository appLabelRepository,
        AppLabelQueryService appLabelQueryService
    ) {
        this.appLabelService = appLabelService;
        this.appLabelRepository = appLabelRepository;
        this.appLabelQueryService = appLabelQueryService;
    }

    /**
     * {@code POST  /app-labels} : Create a new appLabel.
     *
     * @param appLabelDTO the appLabelDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appLabelDTO, or with status {@code 400 (Bad Request)} if the appLabel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/app-labels")
    public ResponseEntity<AppLabelDTO> createAppLabel(@Valid @RequestBody AppLabelDTO appLabelDTO) throws URISyntaxException {
        log.debug("REST request to save AppLabel : {}", appLabelDTO);
        if (appLabelDTO.getId() != null) {
            throw new BadRequestAlertException("A new appLabel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppLabelDTO result = appLabelService.save(appLabelDTO);
        return ResponseEntity
            .created(new URI("/api/app-labels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /app-labels/:id} : Updates an existing appLabel.
     *
     * @param id the id of the appLabelDTO to save.
     * @param appLabelDTO the appLabelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appLabelDTO,
     * or with status {@code 400 (Bad Request)} if the appLabelDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appLabelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/app-labels/{id}")
    public ResponseEntity<AppLabelDTO> updateAppLabel(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AppLabelDTO appLabelDTO
    ) throws URISyntaxException {
        log.debug("REST request to update AppLabel : {}, {}", id, appLabelDTO);
        if (appLabelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, appLabelDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!appLabelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AppLabelDTO result = appLabelService.update(appLabelDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appLabelDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /app-labels/:id} : Partial updates given fields of an existing appLabel, field will ignore if it is null
     *
     * @param id the id of the appLabelDTO to save.
     * @param appLabelDTO the appLabelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appLabelDTO,
     * or with status {@code 400 (Bad Request)} if the appLabelDTO is not valid,
     * or with status {@code 404 (Not Found)} if the appLabelDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the appLabelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/app-labels/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AppLabelDTO> partialUpdateAppLabel(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AppLabelDTO appLabelDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update AppLabel partially : {}, {}", id, appLabelDTO);
        if (appLabelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, appLabelDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!appLabelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AppLabelDTO> result = appLabelService.partialUpdate(appLabelDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appLabelDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /app-labels} : get all the appLabels.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appLabels in body.
     */
    @GetMapping("/app-labels")
    public ResponseEntity<List<AppLabelDTO>> getAllAppLabels(
        AppLabelCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get AppLabels by criteria: {}", criteria);
        Page<AppLabelDTO> page = appLabelQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /app-labels/count} : count all the appLabels.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/app-labels/count")
    public ResponseEntity<Long> countAppLabels(AppLabelCriteria criteria) {
        log.debug("REST request to count AppLabels by criteria: {}", criteria);
        return ResponseEntity.ok().body(appLabelQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /app-labels/:id} : get the "id" appLabel.
     *
     * @param id the id of the appLabelDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appLabelDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/app-labels/{id}")
    public ResponseEntity<AppLabelDTO> getAppLabel(@PathVariable Long id) {
        log.debug("REST request to get AppLabel : {}", id);
        Optional<AppLabelDTO> appLabelDTO = appLabelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(appLabelDTO);
    }

    /**
     * {@code DELETE  /app-labels/:id} : delete the "id" appLabel.
     *
     * @param id the id of the appLabelDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/app-labels/{id}")
    public ResponseEntity<Void> deleteAppLabel(@PathVariable Long id) {
        log.debug("REST request to delete AppLabel : {}", id);
        appLabelService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
