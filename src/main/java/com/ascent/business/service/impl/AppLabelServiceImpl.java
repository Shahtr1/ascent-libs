package com.ascent.business.service.impl;

import com.ascent.business.domain.AppLabel;
import com.ascent.business.repository.AppLabelRepository;
import com.ascent.business.service.AppLabelService;
import com.ascent.business.service.dto.AppLabelDTO;
import com.ascent.business.service.mapper.AppLabelMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AppLabel}.
 */
@Service
@Transactional
public class AppLabelServiceImpl implements AppLabelService {

    private final Logger log = LoggerFactory.getLogger(AppLabelServiceImpl.class);

    private final AppLabelRepository appLabelRepository;

    private final AppLabelMapper appLabelMapper;

    public AppLabelServiceImpl(AppLabelRepository appLabelRepository, AppLabelMapper appLabelMapper) {
        this.appLabelRepository = appLabelRepository;
        this.appLabelMapper = appLabelMapper;
    }

    @Override
    public AppLabelDTO save(AppLabelDTO appLabelDTO) {
        log.debug("Request to save AppLabel : {}", appLabelDTO);
        AppLabel appLabel = appLabelMapper.toEntity(appLabelDTO);
        appLabel = appLabelRepository.save(appLabel);
        return appLabelMapper.toDto(appLabel);
    }

    @Override
    public AppLabelDTO update(AppLabelDTO appLabelDTO) {
        log.debug("Request to update AppLabel : {}", appLabelDTO);
        AppLabel appLabel = appLabelMapper.toEntity(appLabelDTO);
        appLabel = appLabelRepository.save(appLabel);
        return appLabelMapper.toDto(appLabel);
    }

    @Override
    public Optional<AppLabelDTO> partialUpdate(AppLabelDTO appLabelDTO) {
        log.debug("Request to partially update AppLabel : {}", appLabelDTO);

        return appLabelRepository
            .findById(appLabelDTO.getId())
            .map(existingAppLabel -> {
                appLabelMapper.partialUpdate(existingAppLabel, appLabelDTO);

                return existingAppLabel;
            })
            .map(appLabelRepository::save)
            .map(appLabelMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AppLabelDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AppLabels");
        return appLabelRepository.findAll(pageable).map(appLabelMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppLabelDTO> findOne(Long id) {
        log.debug("Request to get AppLabel : {}", id);
        return appLabelRepository.findById(id).map(appLabelMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AppLabel : {}", id);
        appLabelRepository.deleteById(id);
    }
}
