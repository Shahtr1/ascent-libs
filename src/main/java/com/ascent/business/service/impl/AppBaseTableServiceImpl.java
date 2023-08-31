package com.ascent.business.service.impl;

import com.ascent.business.domain.AppBaseTable;
import com.ascent.business.repository.AppBaseTableRepository;
import com.ascent.business.service.AppBaseTableService;
import com.ascent.business.service.dto.AppBaseTableDTO;
import com.ascent.business.service.mapper.AppBaseTableMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AppBaseTable}.
 */
@Service
@Transactional
public class AppBaseTableServiceImpl implements AppBaseTableService {

    private final Logger log = LoggerFactory.getLogger(AppBaseTableServiceImpl.class);

    private final AppBaseTableRepository appBaseTableRepository;

    private final AppBaseTableMapper appBaseTableMapper;

    public AppBaseTableServiceImpl(AppBaseTableRepository appBaseTableRepository, AppBaseTableMapper appBaseTableMapper) {
        this.appBaseTableRepository = appBaseTableRepository;
        this.appBaseTableMapper = appBaseTableMapper;
    }

    @Override
    public AppBaseTableDTO save(AppBaseTableDTO appBaseTableDTO) {
        log.debug("Request to save AppBaseTable : {}", appBaseTableDTO);
        AppBaseTable appBaseTable = appBaseTableMapper.toEntity(appBaseTableDTO);
        appBaseTable = appBaseTableRepository.save(appBaseTable);
        return appBaseTableMapper.toDto(appBaseTable);
    }

    @Override
    public AppBaseTableDTO update(AppBaseTableDTO appBaseTableDTO) {
        log.debug("Request to update AppBaseTable : {}", appBaseTableDTO);
        AppBaseTable appBaseTable = appBaseTableMapper.toEntity(appBaseTableDTO);
        appBaseTable = appBaseTableRepository.save(appBaseTable);
        return appBaseTableMapper.toDto(appBaseTable);
    }

    @Override
    public Optional<AppBaseTableDTO> partialUpdate(AppBaseTableDTO appBaseTableDTO) {
        log.debug("Request to partially update AppBaseTable : {}", appBaseTableDTO);

        return appBaseTableRepository
            .findById(appBaseTableDTO.getId())
            .map(existingAppBaseTable -> {
                appBaseTableMapper.partialUpdate(existingAppBaseTable, appBaseTableDTO);

                return existingAppBaseTable;
            })
            .map(appBaseTableRepository::save)
            .map(appBaseTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AppBaseTableDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AppBaseTables");
        return appBaseTableRepository.findAll(pageable).map(appBaseTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppBaseTableDTO> findOne(Long id) {
        log.debug("Request to get AppBaseTable : {}", id);
        return appBaseTableRepository.findById(id).map(appBaseTableMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AppBaseTable : {}", id);
        appBaseTableRepository.deleteById(id);
    }
}
