package com.ascent.business.web.rest;

import com.ascent.business.repository.AppPropertiesRepository;
import com.ascent.business.service.AppPropertiesQueryService;
import com.ascent.business.service.AppPropertiesService;
import com.ascent.business.service.criteria.AppPropertiesCriteria;
import com.ascent.business.service.dto.AppPropertiesDTO;
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
 * REST controller for managing {@link com.ascent.business.domain.AppProperties}.
 */
@RestController
@RequestMapping("/api")
public class AppPropertiesResource {

    private final Logger log = LoggerFactory.getLogger(AppPropertiesResource.class);

    private static final String ENTITY_NAME = "appProperties";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppPropertiesService appPropertiesService;

    private final AppPropertiesRepository appPropertiesRepository;

    private final AppPropertiesQueryService appPropertiesQueryService;

    public AppPropertiesResource(
        AppPropertiesService appPropertiesService,
        AppPropertiesRepository appPropertiesRepository,
        AppPropertiesQueryService appPropertiesQueryService
    ) {
        this.appPropertiesService = appPropertiesService;
        this.appPropertiesRepository = appPropertiesRepository;
        this.appPropertiesQueryService = appPropertiesQueryService;
    }

    /**
     * {@code POST  /app-properties} : Create a new appProperties.
     *
     * @param appPropertiesDTO the appPropertiesDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appPropertiesDTO, or with status {@code 400 (Bad Request)} if the appProperties has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/app-properties")
    public ResponseEntity<AppPropertiesDTO> createAppProperties(@Valid @RequestBody AppPropertiesDTO appPropertiesDTO)
        throws URISyntaxException {
        log.debug("REST request to save AppProperties : {}", appPropertiesDTO);
        if (appPropertiesDTO.getId() != null) {
            throw new BadRequestAlertException("A new appProperties cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppPropertiesDTO result = appPropertiesService.save(appPropertiesDTO);
        return ResponseEntity
            .created(new URI("/api/app-properties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /app-properties/:id} : Updates an existing appProperties.
     *
     * @param id the id of the appPropertiesDTO to save.
     * @param appPropertiesDTO the appPropertiesDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appPropertiesDTO,
     * or with status {@code 400 (Bad Request)} if the appPropertiesDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appPropertiesDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/app-properties/{id}")
    public ResponseEntity<AppPropertiesDTO> updateAppProperties(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AppPropertiesDTO appPropertiesDTO
    ) throws URISyntaxException {
        log.debug("REST request to update AppProperties : {}, {}", id, appPropertiesDTO);
        if (appPropertiesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, appPropertiesDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!appPropertiesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AppPropertiesDTO result = appPropertiesService.update(appPropertiesDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appPropertiesDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /app-properties/:id} : Partial updates given fields of an existing appProperties, field will ignore if it is null
     *
     * @param id the id of the appPropertiesDTO to save.
     * @param appPropertiesDTO the appPropertiesDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appPropertiesDTO,
     * or with status {@code 400 (Bad Request)} if the appPropertiesDTO is not valid,
     * or with status {@code 404 (Not Found)} if the appPropertiesDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the appPropertiesDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/app-properties/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AppPropertiesDTO> partialUpdateAppProperties(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AppPropertiesDTO appPropertiesDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update AppProperties partially : {}, {}", id, appPropertiesDTO);
        if (appPropertiesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, appPropertiesDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!appPropertiesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AppPropertiesDTO> result = appPropertiesService.partialUpdate(appPropertiesDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appPropertiesDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /app-properties} : get all the appProperties.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appProperties in body.
     */
    @GetMapping("/app-properties")
    public ResponseEntity<List<AppPropertiesDTO>> getAllAppProperties(
        AppPropertiesCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get AppProperties by criteria: {}", criteria);
        Page<AppPropertiesDTO> page = appPropertiesQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /app-properties/count} : count all the appProperties.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/app-properties/count")
    public ResponseEntity<Long> countAppProperties(AppPropertiesCriteria criteria) {
        log.debug("REST request to count AppProperties by criteria: {}", criteria);
        return ResponseEntity.ok().body(appPropertiesQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /app-properties/:id} : get the "id" appProperties.
     *
     * @param id the id of the appPropertiesDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appPropertiesDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/app-properties/{id}")
    public ResponseEntity<AppPropertiesDTO> getAppProperties(@PathVariable Long id) {
        log.debug("REST request to get AppProperties : {}", id);
        Optional<AppPropertiesDTO> appPropertiesDTO = appPropertiesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(appPropertiesDTO);
    }

    /**
     * {@code DELETE  /app-properties/:id} : delete the "id" appProperties.
     *
     * @param id the id of the appPropertiesDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/app-properties/{id}")
    public ResponseEntity<Void> deleteAppProperties(@PathVariable Long id) {
        log.debug("REST request to delete AppProperties : {}", id);
        appPropertiesService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
