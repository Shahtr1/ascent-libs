package com.ascent.business.service;

import com.ascent.business.domain.*; // for static metamodels
import com.ascent.business.domain.ClientAccount;
import com.ascent.business.repository.ClientAccountRepository;
import com.ascent.business.service.criteria.ClientAccountCriteria;
import com.ascent.business.service.dto.ClientAccountDTO;
import com.ascent.business.service.mapper.ClientAccountMapper;
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
 * Service for executing complex queries for {@link ClientAccount} entities in the database.
 * The main input is a {@link ClientAccountCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ClientAccountDTO} or a {@link Page} of {@link ClientAccountDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ClientAccountQueryService extends QueryService<ClientAccount> {

    private final Logger log = LoggerFactory.getLogger(ClientAccountQueryService.class);

    private final ClientAccountRepository clientAccountRepository;

    private final ClientAccountMapper clientAccountMapper;

    public ClientAccountQueryService(ClientAccountRepository clientAccountRepository, ClientAccountMapper clientAccountMapper) {
        this.clientAccountRepository = clientAccountRepository;
        this.clientAccountMapper = clientAccountMapper;
    }

    /**
     * Return a {@link List} of {@link ClientAccountDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ClientAccountDTO> findByCriteria(ClientAccountCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<ClientAccount> specification = createSpecification(criteria);
        return clientAccountMapper.toDto(clientAccountRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link ClientAccountDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ClientAccountDTO> findByCriteria(ClientAccountCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<ClientAccount> specification = createSpecification(criteria);
        return clientAccountRepository.findAll(specification, page).map(clientAccountMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ClientAccountCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<ClientAccount> specification = createSpecification(criteria);
        return clientAccountRepository.count(specification);
    }

    /**
     * Function to convert {@link ClientAccountCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<ClientAccount> createSpecification(ClientAccountCriteria criteria) {
        Specification<ClientAccount> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), ClientAccount_.id));
            }
            if (criteria.getRefId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getRefId(), ClientAccount_.refId));
            }
            if (criteria.getShortname() != null) {
                specification = specification.and(buildStringSpecification(criteria.getShortname(), ClientAccount_.shortname));
            }
            if (criteria.getMiddleName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMiddleName(), ClientAccount_.middleName));
            }
            if (criteria.getTrxnStatus() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTrxnStatus(), ClientAccount_.trxnStatus));
            }
            if (criteria.getReferenceName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getReferenceName(), ClientAccount_.referenceName));
            }
            if (criteria.getAmount() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAmount(), ClientAccount_.amount));
            }
            if (criteria.getCurrency() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCurrency(), ClientAccount_.currency));
            }
            if (criteria.getIsActive() != null) {
                specification = specification.and(buildSpecification(criteria.getIsActive(), ClientAccount_.isActive));
            }
            if (criteria.getIsEnabled() != null) {
                specification = specification.and(buildSpecification(criteria.getIsEnabled(), ClientAccount_.isEnabled));
            }
        }
        return specification;
    }
}
