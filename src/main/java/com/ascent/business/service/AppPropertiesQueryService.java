package com.ascent.business.service;

import com.ascent.business.domain.*; // for static metamodels
import com.ascent.business.domain.AppProperties;
import com.ascent.business.repository.AppPropertiesRepository;
import com.ascent.business.service.criteria.AppPropertiesCriteria;
import com.ascent.business.service.dto.AppPropertiesDTO;
import com.ascent.business.service.mapper.AppPropertiesMapper;
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
 * Service for executing complex queries for {@link AppProperties} entities in the database.
 * The main input is a {@link AppPropertiesCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AppPropertiesDTO} or a {@link Page} of {@link AppPropertiesDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AppPropertiesQueryService extends QueryService<AppProperties> {

    private final Logger log = LoggerFactory.getLogger(AppPropertiesQueryService.class);

    private final AppPropertiesRepository appPropertiesRepository;

    private final AppPropertiesMapper appPropertiesMapper;

    public AppPropertiesQueryService(AppPropertiesRepository appPropertiesRepository, AppPropertiesMapper appPropertiesMapper) {
        this.appPropertiesRepository = appPropertiesRepository;
        this.appPropertiesMapper = appPropertiesMapper;
    }

    /**
     * Return a {@link List} of {@link AppPropertiesDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AppPropertiesDTO> findByCriteria(AppPropertiesCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AppProperties> specification = createSpecification(criteria);
        return appPropertiesMapper.toDto(appPropertiesRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link AppPropertiesDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AppPropertiesDTO> findByCriteria(AppPropertiesCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AppProperties> specification = createSpecification(criteria);
        return appPropertiesRepository.findAll(specification, page).map(appPropertiesMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AppPropertiesCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AppProperties> specification = createSpecification(criteria);
        return appPropertiesRepository.count(specification);
    }

    /**
     * Function to convert {@link AppPropertiesCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AppProperties> createSpecification(AppPropertiesCriteria criteria) {
        Specification<AppProperties> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AppProperties_.id));
            }
            if (criteria.getUuid() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUuid(), AppProperties_.uuid));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), AppProperties_.name));
            }
            if (criteria.getValue() != null) {
                specification = specification.and(buildStringSpecification(criteria.getValue(), AppProperties_.value));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), AppProperties_.description));
            }
        }
        return specification;
    }
}
