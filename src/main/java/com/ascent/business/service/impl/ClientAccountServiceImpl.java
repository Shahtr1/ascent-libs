package com.ascent.business.service.impl;

import com.ascent.business.domain.ClientAccount;
import com.ascent.business.repository.ClientAccountRepository;
import com.ascent.business.service.ClientAccountService;
import com.ascent.business.service.dto.ClientAccountDTO;
import com.ascent.business.service.mapper.ClientAccountMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ClientAccount}.
 */
@Service
@Transactional
public class ClientAccountServiceImpl implements ClientAccountService {

    private final Logger log = LoggerFactory.getLogger(ClientAccountServiceImpl.class);

    private final ClientAccountRepository clientAccountRepository;

    private final ClientAccountMapper clientAccountMapper;

    public ClientAccountServiceImpl(ClientAccountRepository clientAccountRepository, ClientAccountMapper clientAccountMapper) {
        this.clientAccountRepository = clientAccountRepository;
        this.clientAccountMapper = clientAccountMapper;
    }

    @Override
    public ClientAccountDTO save(ClientAccountDTO clientAccountDTO) {
        log.debug("Request to save ClientAccount : {}", clientAccountDTO);
        ClientAccount clientAccount = clientAccountMapper.toEntity(clientAccountDTO);
        clientAccount = clientAccountRepository.save(clientAccount);
        return clientAccountMapper.toDto(clientAccount);
    }

    @Override
    public ClientAccountDTO update(ClientAccountDTO clientAccountDTO) {
        log.debug("Request to update ClientAccount : {}", clientAccountDTO);
        ClientAccount clientAccount = clientAccountMapper.toEntity(clientAccountDTO);
        clientAccount = clientAccountRepository.save(clientAccount);
        return clientAccountMapper.toDto(clientAccount);
    }

    @Override
    public Optional<ClientAccountDTO> partialUpdate(ClientAccountDTO clientAccountDTO) {
        log.debug("Request to partially update ClientAccount : {}", clientAccountDTO);

        return clientAccountRepository
            .findById(clientAccountDTO.getId())
            .map(existingClientAccount -> {
                clientAccountMapper.partialUpdate(existingClientAccount, clientAccountDTO);

                return existingClientAccount;
            })
            .map(clientAccountRepository::save)
            .map(clientAccountMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ClientAccountDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ClientAccounts");
        return clientAccountRepository.findAll(pageable).map(clientAccountMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ClientAccountDTO> findOne(Long id) {
        log.debug("Request to get ClientAccount : {}", id);
        return clientAccountRepository.findById(id).map(clientAccountMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ClientAccount : {}", id);
        clientAccountRepository.deleteById(id);
    }
}
