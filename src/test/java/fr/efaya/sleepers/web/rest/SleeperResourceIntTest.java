package fr.efaya.sleepers.web.rest;

import fr.efaya.sleepers.PartySleeperPlannerApp;

import fr.efaya.sleepers.domain.Sleeper;
import fr.efaya.sleepers.repository.SleeperRepository;
import fr.efaya.sleepers.service.SleeperService;
import fr.efaya.sleepers.service.dto.SleeperDTO;
import fr.efaya.sleepers.service.mapper.SleeperMapper;
import fr.efaya.sleepers.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static fr.efaya.sleepers.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SleeperResource REST controller.
 *
 * @see SleeperResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PartySleeperPlannerApp.class)
public class SleeperResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SleeperRepository sleeperRepository;


    @Autowired
    private SleeperMapper sleeperMapper;
    

    @Autowired
    private SleeperService sleeperService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSleeperMockMvc;

    private Sleeper sleeper;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SleeperResource sleeperResource = new SleeperResource(sleeperService);
        this.restSleeperMockMvc = MockMvcBuilders.standaloneSetup(sleeperResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sleeper createEntity(EntityManager em) {
        Sleeper sleeper = new Sleeper()
            .name(DEFAULT_NAME);
        return sleeper;
    }

    @Before
    public void initTest() {
        sleeper = createEntity(em);
    }

    @Test
    @Transactional
    public void createSleeper() throws Exception {
        int databaseSizeBeforeCreate = sleeperRepository.findAll().size();

        // Create the Sleeper
        SleeperDTO sleeperDTO = sleeperMapper.toDto(sleeper);
        restSleeperMockMvc.perform(post("/api/sleepers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sleeperDTO)))
            .andExpect(status().isCreated());

        // Validate the Sleeper in the database
        List<Sleeper> sleeperList = sleeperRepository.findAll();
        assertThat(sleeperList).hasSize(databaseSizeBeforeCreate + 1);
        Sleeper testSleeper = sleeperList.get(sleeperList.size() - 1);
        assertThat(testSleeper.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSleeperWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sleeperRepository.findAll().size();

        // Create the Sleeper with an existing ID
        sleeper.setId(1L);
        SleeperDTO sleeperDTO = sleeperMapper.toDto(sleeper);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSleeperMockMvc.perform(post("/api/sleepers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sleeperDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Sleeper in the database
        List<Sleeper> sleeperList = sleeperRepository.findAll();
        assertThat(sleeperList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sleeperRepository.findAll().size();
        // set the field null
        sleeper.setName(null);

        // Create the Sleeper, which fails.
        SleeperDTO sleeperDTO = sleeperMapper.toDto(sleeper);

        restSleeperMockMvc.perform(post("/api/sleepers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sleeperDTO)))
            .andExpect(status().isBadRequest());

        List<Sleeper> sleeperList = sleeperRepository.findAll();
        assertThat(sleeperList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSleepers() throws Exception {
        // Initialize the database
        sleeperRepository.saveAndFlush(sleeper);

        // Get all the sleeperList
        restSleeperMockMvc.perform(get("/api/sleepers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sleeper.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getSleeper() throws Exception {
        // Initialize the database
        sleeperRepository.saveAndFlush(sleeper);

        // Get the sleeper
        restSleeperMockMvc.perform(get("/api/sleepers/{id}", sleeper.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sleeper.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSleeper() throws Exception {
        // Get the sleeper
        restSleeperMockMvc.perform(get("/api/sleepers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSleeper() throws Exception {
        // Initialize the database
        sleeperRepository.saveAndFlush(sleeper);

        int databaseSizeBeforeUpdate = sleeperRepository.findAll().size();

        // Update the sleeper
        Sleeper updatedSleeper = sleeperRepository.findById(sleeper.getId()).get();
        // Disconnect from session so that the updates on updatedSleeper are not directly saved in db
        em.detach(updatedSleeper);
        updatedSleeper
            .name(UPDATED_NAME);
        SleeperDTO sleeperDTO = sleeperMapper.toDto(updatedSleeper);

        restSleeperMockMvc.perform(put("/api/sleepers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sleeperDTO)))
            .andExpect(status().isOk());

        // Validate the Sleeper in the database
        List<Sleeper> sleeperList = sleeperRepository.findAll();
        assertThat(sleeperList).hasSize(databaseSizeBeforeUpdate);
        Sleeper testSleeper = sleeperList.get(sleeperList.size() - 1);
        assertThat(testSleeper.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSleeper() throws Exception {
        int databaseSizeBeforeUpdate = sleeperRepository.findAll().size();

        // Create the Sleeper
        SleeperDTO sleeperDTO = sleeperMapper.toDto(sleeper);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSleeperMockMvc.perform(put("/api/sleepers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sleeperDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Sleeper in the database
        List<Sleeper> sleeperList = sleeperRepository.findAll();
        assertThat(sleeperList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSleeper() throws Exception {
        // Initialize the database
        sleeperRepository.saveAndFlush(sleeper);

        int databaseSizeBeforeDelete = sleeperRepository.findAll().size();

        // Get the sleeper
        restSleeperMockMvc.perform(delete("/api/sleepers/{id}", sleeper.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sleeper> sleeperList = sleeperRepository.findAll();
        assertThat(sleeperList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sleeper.class);
        Sleeper sleeper1 = new Sleeper();
        sleeper1.setId(1L);
        Sleeper sleeper2 = new Sleeper();
        sleeper2.setId(sleeper1.getId());
        assertThat(sleeper1).isEqualTo(sleeper2);
        sleeper2.setId(2L);
        assertThat(sleeper1).isNotEqualTo(sleeper2);
        sleeper1.setId(null);
        assertThat(sleeper1).isNotEqualTo(sleeper2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SleeperDTO.class);
        SleeperDTO sleeperDTO1 = new SleeperDTO();
        sleeperDTO1.setId(1L);
        SleeperDTO sleeperDTO2 = new SleeperDTO();
        assertThat(sleeperDTO1).isNotEqualTo(sleeperDTO2);
        sleeperDTO2.setId(sleeperDTO1.getId());
        assertThat(sleeperDTO1).isEqualTo(sleeperDTO2);
        sleeperDTO2.setId(2L);
        assertThat(sleeperDTO1).isNotEqualTo(sleeperDTO2);
        sleeperDTO1.setId(null);
        assertThat(sleeperDTO1).isNotEqualTo(sleeperDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sleeperMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sleeperMapper.fromId(null)).isNull();
    }
}
