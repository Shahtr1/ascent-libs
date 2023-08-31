package com.ascent.business.web.rest;

import com.ascent.business.repository.AppLanguageRepository;
import com.ascent.business.service.AppLanguageQueryService;
import com.ascent.business.service.AppLanguageService;
import com.ascent.business.service.criteria.AppLanguageCriteria;
import com.ascent.business.service.dto.AppLanguageDTO;
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
 * REST controller for managing {@link com.ascent.business.domain.AppLanguage}.
 */
@RestController
@RequestMapping("/api")
public class AppLanguageResource {

    private final Logger log = LoggerFactory.getLogger(AppLanguageResource.class);

    private static final String ENTITY_NAME = "appLanguage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppLanguageService appLanguageService;

    private final AppLanguageRepository appLanguageRepository;

    private final AppLanguageQueryService appLanguageQueryService;

    public AppLanguageResource(
        AppLanguageService appLanguageService,
        AppLanguageRepository appLanguageRepository,
        AppLanguageQueryService appLanguageQueryService
    ) {
        this.appLanguageService = appLanguageService;
        this.appLanguageRepository = appLanguageRepository;
        this.appLanguageQueryService = appLanguageQueryService;
    }

    /**
     * {@code POST  /app-languages} : Create a new appLanguage.
     *
     * @param appLanguageDTO the appLanguageDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appLanguageDTO, or with status {@code 400 (Bad Request)} if the appLanguage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/app-languages")
    public ResponseEntity<AppLanguageDTO> createAppLanguage(@Valid @RequestBody AppLanguageDTO appLanguageDTO) throws URISyntaxException {
        log.debug("REST request to save AppLanguage : {}", appLanguageDTO);
        if (appLanguageDTO.getId() != null) {
            throw new BadRequestAlertException("A new appLanguage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppLanguageDTO result = appLanguageService.save(appLanguageDTO);
        return ResponseEntity
            .created(new URI("/api/app-languages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /app-languages/:id} : Updates an existing appLanguage.
     *
     * @param id the id of the appLanguageDTO to save.
     * @param appLanguageDTO the appLanguageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appLanguageDTO,
     * or with status {@code 400 (Bad Request)} if the appLanguageDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appLanguageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/app-languages/{id}")
    public ResponseEntity<AppLanguageDTO> updateAppLanguage(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AppLanguageDTO appLanguageDTO
    ) throws URISyntaxException {
        log.debug("REST request to update AppLanguage : {}, {}", id, appLanguageDTO);
        if (appLanguageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, appLanguageDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!appLanguageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AppLanguageDTO result = appLanguageService.update(appLanguageDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appLanguageDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /app-languages/:id} : Partial updates given fields of an existing appLanguage, field will ignore if it is null
     *
     * @param id the id of the appLanguageDTO to save.
     * @param appLanguageDTO the appLanguageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appLanguageDTO,
     * or with status {@code 400 (Bad Request)} if the appLanguageDTO is not valid,
     * or with status {@code 404 (Not Found)} if the appLanguageDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the appLanguageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/app-languages/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AppLanguageDTO> partialUpdateAppLanguage(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AppLanguageDTO appLanguageDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update AppLanguage partially : {}, {}", id, appLanguageDTO);
        if (appLanguageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, appLanguageDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!appLanguageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AppLanguageDTO> result = appLanguageService.partialUpdate(appLanguageDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appLanguageDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /app-languages} : get all the appLanguages.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appLanguages in body.
     */
    @GetMapping("/app-languages")
    public ResponseEntity<List<AppLanguageDTO>> getAllAppLanguages(
        AppLanguageCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get AppLanguages by criteria: {}", criteria);
        Page<AppLanguageDTO> page = appLanguageQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /app-languages/count} : count all the appLanguages.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/app-languages/count")
    public ResponseEntity<Long> countAppLanguages(AppLanguageCriteria criteria) {
        log.debug("REST request to count AppLanguages by criteria: {}", criteria);
        return ResponseEntity.ok().body(appLanguageQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /app-languages/:id} : get the "id" appLanguage.
     *
     * @param id the id of the appLanguageDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appLanguageDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/app-languages/{id}")
    public ResponseEntity<AppLanguageDTO> getAppLanguage(@PathVariable Long id) {
        log.debug("REST request to get AppLanguage : {}", id);
        Optional<AppLanguageDTO> appLanguageDTO = appLanguageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(appLanguageDTO);
    }

    /**
     * {@code DELETE  /app-languages/:id} : delete the "id" appLanguage.
     *
     * @param id the id of the appLanguageDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/app-languages/{id}")
    public ResponseEntity<Void> deleteAppLanguage(@PathVariable Long id) {
        log.debug("REST request to delete AppLanguage : {}", id);
        appLanguageService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
