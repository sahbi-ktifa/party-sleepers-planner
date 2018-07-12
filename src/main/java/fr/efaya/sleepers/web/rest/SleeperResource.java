package fr.efaya.sleepers.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.efaya.sleepers.service.SleeperService;
import fr.efaya.sleepers.web.rest.errors.BadRequestAlertException;
import fr.efaya.sleepers.web.rest.util.HeaderUtil;
import fr.efaya.sleepers.service.dto.SleeperDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Sleeper.
 */
@RestController
@RequestMapping("/api")
public class SleeperResource {

    private final Logger log = LoggerFactory.getLogger(SleeperResource.class);

    private static final String ENTITY_NAME = "sleeper";

    private final SleeperService sleeperService;

    public SleeperResource(SleeperService sleeperService) {
        this.sleeperService = sleeperService;
    }

    /**
     * POST  /sleepers : Create a new sleeper.
     *
     * @param sleeperDTO the sleeperDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sleeperDTO, or with status 400 (Bad Request) if the sleeper has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sleepers")
    @Timed
    public ResponseEntity<SleeperDTO> createSleeper(@Valid @RequestBody SleeperDTO sleeperDTO) throws URISyntaxException {
        log.debug("REST request to save Sleeper : {}", sleeperDTO);
        if (sleeperDTO.getId() != null) {
            throw new BadRequestAlertException("A new sleeper cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SleeperDTO result = sleeperService.save(sleeperDTO);
        return ResponseEntity.created(new URI("/api/sleepers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sleepers : Updates an existing sleeper.
     *
     * @param sleeperDTO the sleeperDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sleeperDTO,
     * or with status 400 (Bad Request) if the sleeperDTO is not valid,
     * or with status 500 (Internal Server Error) if the sleeperDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sleepers")
    @Timed
    public ResponseEntity<SleeperDTO> updateSleeper(@Valid @RequestBody SleeperDTO sleeperDTO) throws URISyntaxException {
        log.debug("REST request to update Sleeper : {}", sleeperDTO);
        if (sleeperDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SleeperDTO result = sleeperService.save(sleeperDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sleeperDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sleepers : get all the sleepers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sleepers in body
     */
    @GetMapping("/sleepers")
    @Timed
    public List<SleeperDTO> getAllSleepers() {
        log.debug("REST request to get all Sleepers");
        return sleeperService.findAll();
    }

    /**
     * GET  /sleepers/:id : get the "id" sleeper.
     *
     * @param id the id of the sleeperDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sleeperDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sleepers/{id}")
    @Timed
    public ResponseEntity<SleeperDTO> getSleeper(@PathVariable Long id) {
        log.debug("REST request to get Sleeper : {}", id);
        Optional<SleeperDTO> sleeperDTO = sleeperService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sleeperDTO);
    }

    /**
     * DELETE  /sleepers/:id : delete the "id" sleeper.
     *
     * @param id the id of the sleeperDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sleepers/{id}")
    @Timed
    public ResponseEntity<Void> deleteSleeper(@PathVariable Long id) {
        log.debug("REST request to delete Sleeper : {}", id);
        sleeperService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
