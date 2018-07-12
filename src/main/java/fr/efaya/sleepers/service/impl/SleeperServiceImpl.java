package fr.efaya.sleepers.service.impl;

import fr.efaya.sleepers.service.SleeperService;
import fr.efaya.sleepers.domain.Sleeper;
import fr.efaya.sleepers.repository.SleeperRepository;
import fr.efaya.sleepers.service.dto.SleeperDTO;
import fr.efaya.sleepers.service.mapper.SleeperMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Sleeper.
 */
@Service
@Transactional
public class SleeperServiceImpl implements SleeperService {

    private final Logger log = LoggerFactory.getLogger(SleeperServiceImpl.class);

    private final SleeperRepository sleeperRepository;

    private final SleeperMapper sleeperMapper;

    public SleeperServiceImpl(SleeperRepository sleeperRepository, SleeperMapper sleeperMapper) {
        this.sleeperRepository = sleeperRepository;
        this.sleeperMapper = sleeperMapper;
    }

    /**
     * Save a sleeper.
     *
     * @param sleeperDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SleeperDTO save(SleeperDTO sleeperDTO) {
        log.debug("Request to save Sleeper : {}", sleeperDTO);
        Sleeper sleeper = sleeperMapper.toEntity(sleeperDTO);
        sleeper = sleeperRepository.save(sleeper);
        return sleeperMapper.toDto(sleeper);
    }

    /**
     * Get all the sleepers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SleeperDTO> findAll() {
        log.debug("Request to get all Sleepers");
        return sleeperRepository.findAll().stream()
            .map(sleeperMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one sleeper by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SleeperDTO> findOne(Long id) {
        log.debug("Request to get Sleeper : {}", id);
        return sleeperRepository.findById(id)
            .map(sleeperMapper::toDto);
    }

    /**
     * Delete the sleeper by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Sleeper : {}", id);
        sleeperRepository.deleteById(id);
    }
}
