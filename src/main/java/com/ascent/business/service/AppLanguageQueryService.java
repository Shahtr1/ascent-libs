package com.ascent.business.service;

import com.ascent.business.domain.*; // for static metamodels
import com.ascent.business.domain.AppLanguage;
import com.ascent.business.repository.AppLanguageRepository;
import com.ascent.business.service.criteria.AppLanguageCriteria;
import com.ascent.business.service.dto.AppLanguageDTO;
import com.ascent.business.service.mapper.AppLanguageMapper;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link AppLanguage} entities in the database.
 * The main input is a {@link AppLanguageCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AppLanguageDTO} or a {@link Page} of {@link AppLanguageDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AppLanguageQueryService extends QueryService<AppLanguage> {

    private final Logger log = LoggerFactory.getLogger(AppLanguageQueryService.class);

    private final AppLanguageRepository appLanguageRepository;

    private final AppLanguageMapper appLanguageMapper;

    public AppLanguageQueryService(AppLanguageRepository appLanguageRepository, AppLanguageMapper appLanguageMapper) {
        this.appLanguageRepository = appLanguageRepository;
        this.appLanguageMapper = appLanguageMapper;
    }

    /**
     * Return a {@link List} of {@link AppLanguageDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AppLanguageDTO> findByCriteria(AppLanguageCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AppLanguage> specification = createSpecification(criteria);
        return appLanguageMapper.toDto(appLanguageRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link AppLanguageDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AppLanguageDTO> findByCriteria(AppLanguageCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AppLanguage> specification = createSpecification(criteria);
        return appLanguageRepository.findAll(specification, page).map(appLanguageMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AppLanguageCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AppLanguage> specification = createSpecification(criteria);
        return appLanguageRepository.count(specification);
    }

    /**
     * Function to convert {@link AppLanguageCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AppLanguage> createSpecification(AppLanguageCriteria criteria) {
        Specification<AppLanguage> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AppLanguage_.id));
            }
            if (criteria.getUuid() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUuid(), AppLanguage_.uuid));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), AppLanguage_.name));
            }
            if (criteria.getDirection() != null) {
                specification = specification.and(buildSpecification(criteria.getDirection(), AppLanguage_.direction));
            }
        }
        return specification;
    }
}
