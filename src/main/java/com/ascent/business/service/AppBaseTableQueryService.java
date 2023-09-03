package com.ascent.business.service;

import com.ascent.business.domain.*; // for static metamodels
import com.ascent.business.domain.AppBaseTable;
import com.ascent.business.repository.AppBaseTableRepository;
import com.ascent.business.service.criteria.AppBaseTableCriteria;
import com.ascent.business.service.dto.AppBaseTableDTO;
import com.ascent.business.service.mapper.AppBaseTableMapper;
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
 * Service for executing complex queries for {@link AppBaseTable} entities in the database.
 * The main input is a {@link AppBaseTableCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AppBaseTableDTO} or a {@link Page} of {@link AppBaseTableDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AppBaseTableQueryService extends QueryService<AppBaseTable> {

    private final Logger log = LoggerFactory.getLogger(AppBaseTableQueryService.class);

    private final AppBaseTableRepository appBaseTableRepository;

    private final AppBaseTableMapper appBaseTableMapper;

    public AppBaseTableQueryService(AppBaseTableRepository appBaseTableRepository, AppBaseTableMapper appBaseTableMapper) {
        this.appBaseTableRepository = appBaseTableRepository;
        this.appBaseTableMapper = appBaseTableMapper;
    }

    /**
     * Return a {@link List} of {@link AppBaseTableDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AppBaseTableDTO> findByCriteria(AppBaseTableCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AppBaseTable> specification = createSpecification(criteria);
        return appBaseTableMapper.toDto(appBaseTableRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link AppBaseTableDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AppBaseTableDTO> findByCriteria(AppBaseTableCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AppBaseTable> specification = createSpecification(criteria);
        return appBaseTableRepository.findAll(specification, page).map(appBaseTableMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AppBaseTableCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AppBaseTable> specification = createSpecification(criteria);
        return appBaseTableRepository.count(specification);
    }

    /**
     * Function to convert {@link AppBaseTableCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AppBaseTable> createSpecification(AppBaseTableCriteria criteria) {
        Specification<AppBaseTable> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AppBaseTable_.id));
            }
            if (criteria.getUuid() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUuid(), AppBaseTable_.uuid));
            }
        }
        return specification;
    }
}
