package com.ascent.business.service;

import com.ascent.business.domain.*; // for static metamodels
import com.ascent.business.domain.TestEntity;
import com.ascent.business.repository.TestEntityRepository;
import com.ascent.business.service.criteria.TestEntityCriteria;
import com.ascent.business.service.dto.TestEntityDTO;
import com.ascent.business.service.mapper.TestEntityMapper;
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
 * Service for executing complex queries for {@link TestEntity} entities in the database.
 * The main input is a {@link TestEntityCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TestEntityDTO} or a {@link Page} of {@link TestEntityDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TestEntityQueryService extends QueryService<TestEntity> {

    private final Logger log = LoggerFactory.getLogger(TestEntityQueryService.class);

    private final TestEntityRepository testEntityRepository;

    private final TestEntityMapper testEntityMapper;

    public TestEntityQueryService(TestEntityRepository testEntityRepository, TestEntityMapper testEntityMapper) {
        this.testEntityRepository = testEntityRepository;
        this.testEntityMapper = testEntityMapper;
    }

    /**
     * Return a {@link List} of {@link TestEntityDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TestEntityDTO> findByCriteria(TestEntityCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TestEntity> specification = createSpecification(criteria);
        return testEntityMapper.toDto(testEntityRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TestEntityDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TestEntityDTO> findByCriteria(TestEntityCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TestEntity> specification = createSpecification(criteria);
        return testEntityRepository.findAll(specification, page).map(testEntityMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TestEntityCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TestEntity> specification = createSpecification(criteria);
        return testEntityRepository.count(specification);
    }

    /**
     * Function to convert {@link TestEntityCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TestEntity> createSpecification(TestEntityCriteria criteria) {
        Specification<TestEntity> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TestEntity_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), TestEntity_.name));
            }
        }
        return specification;
    }
}
