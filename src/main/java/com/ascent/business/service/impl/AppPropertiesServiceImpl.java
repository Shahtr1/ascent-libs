package com.ascent.business.service.impl;

import com.ascent.business.domain.AppProperties;
import com.ascent.business.repository.AppPropertiesRepository;
import com.ascent.business.service.AppPropertiesService;
import com.ascent.business.service.dto.AppPropertiesDTO;
import com.ascent.business.service.mapper.AppPropertiesMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AppProperties}.
 */
@Service
@Transactional
public class AppPropertiesServiceImpl implements AppPropertiesService {

    private final Logger log = LoggerFactory.getLogger(AppPropertiesServiceImpl.class);

    private final AppPropertiesRepository appPropertiesRepository;

    private final AppPropertiesMapper appPropertiesMapper;

    public AppPropertiesServiceImpl(AppPropertiesRepository appPropertiesRepository, AppPropertiesMapper appPropertiesMapper) {
        this.appPropertiesRepository = appPropertiesRepository;
        this.appPropertiesMapper = appPropertiesMapper;
    }

    @Override
    public AppPropertiesDTO save(AppPropertiesDTO appPropertiesDTO) {
        log.debug("Request to save AppProperties : {}", appPropertiesDTO);
        AppProperties appProperties = appPropertiesMapper.toEntity(appPropertiesDTO);
        appProperties = appPropertiesRepository.save(appProperties);
        return appPropertiesMapper.toDto(appProperties);
    }

    @Override
    public AppPropertiesDTO update(AppPropertiesDTO appPropertiesDTO) {
        log.debug("Request to update AppProperties : {}", appPropertiesDTO);
        AppProperties appProperties = appPropertiesMapper.toEntity(appPropertiesDTO);
        appProperties = appPropertiesRepository.save(appProperties);
        return appPropertiesMapper.toDto(appProperties);
    }

    @Override
    public Optional<AppPropertiesDTO> partialUpdate(AppPropertiesDTO appPropertiesDTO) {
        log.debug("Request to partially update AppProperties : {}", appPropertiesDTO);

        return appPropertiesRepository
            .findById(appPropertiesDTO.getId())
            .map(existingAppProperties -> {
                appPropertiesMapper.partialUpdate(existingAppProperties, appPropertiesDTO);

                return existingAppProperties;
            })
            .map(appPropertiesRepository::save)
            .map(appPropertiesMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AppPropertiesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AppProperties");
        return appPropertiesRepository.findAll(pageable).map(appPropertiesMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppPropertiesDTO> findOne(Long id) {
        log.debug("Request to get AppProperties : {}", id);
        return appPropertiesRepository.findById(id).map(appPropertiesMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AppProperties : {}", id);
        appPropertiesRepository.deleteById(id);
    }
}
