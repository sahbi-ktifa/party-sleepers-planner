package fr.efaya.sleepers.service;

import fr.efaya.sleepers.service.dto.SleeperDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Sleeper.
 */
public interface SleeperService {

    /**
     * Save a sleeper.
     *
     * @param sleeperDTO the entity to save
     * @return the persisted entity
     */
    SleeperDTO save(SleeperDTO sleeperDTO);

    /**
     * Get all the sleepers.
     *
     * @return the list of entities
     */
    List<SleeperDTO> findAll();


    /**
     * Get the "id" sleeper.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SleeperDTO> findOne(Long id);

    /**
     * Delete the "id" sleeper.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
