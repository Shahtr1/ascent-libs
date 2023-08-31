package com.ascent.business.service;

import com.ascent.business.domain.*; // for static metamodels
import com.ascent.business.domain.AppLabel;
import com.ascent.business.repository.AppLabelRepository;
import com.ascent.business.service.criteria.AppLabelCriteria;
import com.ascent.business.service.dto.AppLabelDTO;
import com.ascent.business.service.mapper.AppLabelMapper;
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
 * Service for executing complex queries for {@link AppLabel} entities in the database.
 * The main input is a {@link AppLabelCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AppLabelDTO} or a {@link Page} of {@link AppLabelDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AppLabelQueryService extends QueryService<AppLabel> {

    private final Logger log = LoggerFactory.getLogger(AppLabelQueryService.class);

    private final AppLabelRepository appLabelRepository;

    private final AppLabelMapper appLabelMapper;

    public AppLabelQueryService(AppLabelRepository appLabelRepository, AppLabelMapper appLabelMapper) {
        this.appLabelRepository = appLabelRepository;
        this.appLabelMapper = appLabelMapper;
    }

    /**
     * Return a {@link List} of {@link AppLabelDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AppLabelDTO> findByCriteria(AppLabelCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AppLabel> specification = createSpecification(criteria);
        return appLabelMapper.toDto(appLabelRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link AppLabelDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AppLabelDTO> findByCriteria(AppLabelCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AppLabel> specification = createSpecification(criteria);
        return appLabelRepository.findAll(specification, page).map(appLabelMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AppLabelCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AppLabel> specification = createSpecification(criteria);
        return appLabelRepository.count(specification);
    }

    /**
     * Function to convert {@link AppLabelCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AppLabel> createSpecification(AppLabelCriteria criteria) {
        Specification<AppLabel> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AppLabel_.id));
            }
            if (criteria.getUuid() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUuid(), AppLabel_.uuid));
            }
            if (criteria.getValue() != null) {
                specification = specification.and(buildStringSpecification(criteria.getValue(), AppLabel_.value));
            }
            if (criteria.getLanguageId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getLanguageId(),
                            root -> root.join(AppLabel_.language, JoinType.LEFT).get(AppLanguage_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
