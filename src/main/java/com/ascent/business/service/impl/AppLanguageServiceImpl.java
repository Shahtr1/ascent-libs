package com.ascent.business.service.impl;

import com.ascent.business.domain.AppLanguage;
import com.ascent.business.repository.AppLanguageRepository;
import com.ascent.business.service.AppLanguageService;
import com.ascent.business.service.dto.AppLanguageDTO;
import com.ascent.business.service.mapper.AppLanguageMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AppLanguage}.
 */
@Service
@Transactional
public class AppLanguageServiceImpl implements AppLanguageService {

    private final Logger log = LoggerFactory.getLogger(AppLanguageServiceImpl.class);

    private final AppLanguageRepository appLanguageRepository;

    private final AppLanguageMapper appLanguageMapper;

    public AppLanguageServiceImpl(AppLanguageRepository appLanguageRepository, AppLanguageMapper appLanguageMapper) {
        this.appLanguageRepository = appLanguageRepository;
        this.appLanguageMapper = appLanguageMapper;
    }

    @Override
    public AppLanguageDTO save(AppLanguageDTO appLanguageDTO) {
        log.debug("Request to save AppLanguage : {}", appLanguageDTO);
        AppLanguage appLanguage = appLanguageMapper.toEntity(appLanguageDTO);
        appLanguage = appLanguageRepository.save(appLanguage);
        return appLanguageMapper.toDto(appLanguage);
    }

    @Override
    public AppLanguageDTO update(AppLanguageDTO appLanguageDTO) {
        log.debug("Request to update AppLanguage : {}", appLanguageDTO);
        AppLanguage appLanguage = appLanguageMapper.toEntity(appLanguageDTO);
        appLanguage = appLanguageRepository.save(appLanguage);
        return appLanguageMapper.toDto(appLanguage);
    }

    @Override
    public Optional<AppLanguageDTO> partialUpdate(AppLanguageDTO appLanguageDTO) {
        log.debug("Request to partially update AppLanguage : {}", appLanguageDTO);

        return appLanguageRepository
            .findById(appLanguageDTO.getId())
            .map(existingAppLanguage -> {
                appLanguageMapper.partialUpdate(existingAppLanguage, appLanguageDTO);

                return existingAppLanguage;
            })
            .map(appLanguageRepository::save)
            .map(appLanguageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AppLanguageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AppLanguages");
        return appLanguageRepository.findAll(pageable).map(appLanguageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppLanguageDTO> findOne(Long id) {
        log.debug("Request to get AppLanguage : {}", id);
        return appLanguageRepository.findById(id).map(appLanguageMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AppLanguage : {}", id);
        appLanguageRepository.deleteById(id);
    }
}
