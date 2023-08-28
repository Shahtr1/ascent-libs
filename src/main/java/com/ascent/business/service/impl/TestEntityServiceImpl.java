package com.ascent.business.service.impl;

import com.ascent.business.domain.TestEntity;
import com.ascent.business.repository.TestEntityRepository;
import com.ascent.business.service.TestEntityService;
import com.ascent.business.service.dto.TestEntityDTO;
import com.ascent.business.service.mapper.TestEntityMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TestEntity}.
 */
@Service
@Transactional
public class TestEntityServiceImpl implements TestEntityService {

    private final Logger log = LoggerFactory.getLogger(TestEntityServiceImpl.class);

    private final TestEntityRepository testEntityRepository;

    private final TestEntityMapper testEntityMapper;

    public TestEntityServiceImpl(TestEntityRepository testEntityRepository, TestEntityMapper testEntityMapper) {
        this.testEntityRepository = testEntityRepository;
        this.testEntityMapper = testEntityMapper;
    }

    @Override
    public TestEntityDTO save(TestEntityDTO testEntityDTO) {
        log.debug("Request to save TestEntity : {}", testEntityDTO);
        TestEntity testEntity = testEntityMapper.toEntity(testEntityDTO);
        testEntity = testEntityRepository.save(testEntity);
        return testEntityMapper.toDto(testEntity);
    }

    @Override
    public TestEntityDTO update(TestEntityDTO testEntityDTO) {
        log.debug("Request to update TestEntity : {}", testEntityDTO);
        TestEntity testEntity = testEntityMapper.toEntity(testEntityDTO);
        testEntity = testEntityRepository.save(testEntity);
        return testEntityMapper.toDto(testEntity);
    }

    @Override
    public Optional<TestEntityDTO> partialUpdate(TestEntityDTO testEntityDTO) {
        log.debug("Request to partially update TestEntity : {}", testEntityDTO);

        return testEntityRepository
            .findById(testEntityDTO.getId())
            .map(existingTestEntity -> {
                testEntityMapper.partialUpdate(existingTestEntity, testEntityDTO);

                return existingTestEntity;
            })
            .map(testEntityRepository::save)
            .map(testEntityMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TestEntityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TestEntities");
        return testEntityRepository.findAll(pageable).map(testEntityMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TestEntityDTO> findOne(Long id) {
        log.debug("Request to get TestEntity : {}", id);
        return testEntityRepository.findById(id).map(testEntityMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TestEntity : {}", id);
        testEntityRepository.deleteById(id);
    }
}
