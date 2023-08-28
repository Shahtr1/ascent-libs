package com.ascent.business.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ascent.business.IntegrationTest;
import com.ascent.business.domain.TestEntity;
import com.ascent.business.repository.TestEntityRepository;
import com.ascent.business.service.criteria.TestEntityCriteria;
import com.ascent.business.service.dto.TestEntityDTO;
import com.ascent.business.service.mapper.TestEntityMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TestEntityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TestEntityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/test-entities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TestEntityRepository testEntityRepository;

    @Autowired
    private TestEntityMapper testEntityMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTestEntityMockMvc;

    private TestEntity testEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestEntity createEntity(EntityManager em) {
        TestEntity testEntity = new TestEntity().name(DEFAULT_NAME);
        return testEntity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestEntity createUpdatedEntity(EntityManager em) {
        TestEntity testEntity = new TestEntity().name(UPDATED_NAME);
        return testEntity;
    }

    @BeforeEach
    public void initTest() {
        testEntity = createEntity(em);
    }

    @Test
    @Transactional
    void createTestEntity() throws Exception {
        int databaseSizeBeforeCreate = testEntityRepository.findAll().size();
        // Create the TestEntity
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);
        restTestEntityMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeCreate + 1);
        TestEntity testTestEntity = testEntityList.get(testEntityList.size() - 1);
        assertThat(testTestEntity.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createTestEntityWithExistingId() throws Exception {
        // Create the TestEntity with an existing ID
        testEntity.setId(1L);
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);

        int databaseSizeBeforeCreate = testEntityRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestEntityMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = testEntityRepository.findAll().size();
        // set the field null
        testEntity.setName(null);

        // Create the TestEntity, which fails.
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);

        restTestEntityMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isBadRequest());

        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTestEntities() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        // Get all the testEntityList
        restTestEntityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getTestEntity() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        // Get the testEntity
        restTestEntityMockMvc
            .perform(get(ENTITY_API_URL_ID, testEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(testEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getTestEntitiesByIdFiltering() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        Long id = testEntity.getId();

        defaultTestEntityShouldBeFound("id.equals=" + id);
        defaultTestEntityShouldNotBeFound("id.notEquals=" + id);

        defaultTestEntityShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultTestEntityShouldNotBeFound("id.greaterThan=" + id);

        defaultTestEntityShouldBeFound("id.lessThanOrEqual=" + id);
        defaultTestEntityShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllTestEntitiesByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        // Get all the testEntityList where name equals to DEFAULT_NAME
        defaultTestEntityShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the testEntityList where name equals to UPDATED_NAME
        defaultTestEntityShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllTestEntitiesByNameIsInShouldWork() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        // Get all the testEntityList where name in DEFAULT_NAME or UPDATED_NAME
        defaultTestEntityShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the testEntityList where name equals to UPDATED_NAME
        defaultTestEntityShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllTestEntitiesByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        // Get all the testEntityList where name is not null
        defaultTestEntityShouldBeFound("name.specified=true");

        // Get all the testEntityList where name is null
        defaultTestEntityShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    void getAllTestEntitiesByNameContainsSomething() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        // Get all the testEntityList where name contains DEFAULT_NAME
        defaultTestEntityShouldBeFound("name.contains=" + DEFAULT_NAME);

        // Get all the testEntityList where name contains UPDATED_NAME
        defaultTestEntityShouldNotBeFound("name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllTestEntitiesByNameNotContainsSomething() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        // Get all the testEntityList where name does not contain DEFAULT_NAME
        defaultTestEntityShouldNotBeFound("name.doesNotContain=" + DEFAULT_NAME);

        // Get all the testEntityList where name does not contain UPDATED_NAME
        defaultTestEntityShouldBeFound("name.doesNotContain=" + UPDATED_NAME);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultTestEntityShouldBeFound(String filter) throws Exception {
        restTestEntityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));

        // Check, that the count call also returns 1
        restTestEntityMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultTestEntityShouldNotBeFound(String filter) throws Exception {
        restTestEntityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTestEntityMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingTestEntity() throws Exception {
        // Get the testEntity
        restTestEntityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTestEntity() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();

        // Update the testEntity
        TestEntity updatedTestEntity = testEntityRepository.findById(testEntity.getId()).get();
        // Disconnect from session so that the updates on updatedTestEntity are not directly saved in db
        em.detach(updatedTestEntity);
        updatedTestEntity.name(UPDATED_NAME);
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(updatedTestEntity);

        restTestEntityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, testEntityDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isOk());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
        TestEntity testTestEntity = testEntityList.get(testEntityList.size() - 1);
        assertThat(testTestEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingTestEntity() throws Exception {
        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();
        testEntity.setId(count.incrementAndGet());

        // Create the TestEntity
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestEntityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, testEntityDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTestEntity() throws Exception {
        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();
        testEntity.setId(count.incrementAndGet());

        // Create the TestEntity
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTestEntityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTestEntity() throws Exception {
        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();
        testEntity.setId(count.incrementAndGet());

        // Create the TestEntity
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTestEntityMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTestEntityWithPatch() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();

        // Update the testEntity using partial update
        TestEntity partialUpdatedTestEntity = new TestEntity();
        partialUpdatedTestEntity.setId(testEntity.getId());

        partialUpdatedTestEntity.name(UPDATED_NAME);

        restTestEntityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTestEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTestEntity))
            )
            .andExpect(status().isOk());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
        TestEntity testTestEntity = testEntityList.get(testEntityList.size() - 1);
        assertThat(testTestEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void fullUpdateTestEntityWithPatch() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();

        // Update the testEntity using partial update
        TestEntity partialUpdatedTestEntity = new TestEntity();
        partialUpdatedTestEntity.setId(testEntity.getId());

        partialUpdatedTestEntity.name(UPDATED_NAME);

        restTestEntityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTestEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTestEntity))
            )
            .andExpect(status().isOk());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
        TestEntity testTestEntity = testEntityList.get(testEntityList.size() - 1);
        assertThat(testTestEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingTestEntity() throws Exception {
        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();
        testEntity.setId(count.incrementAndGet());

        // Create the TestEntity
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTestEntityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, testEntityDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTestEntity() throws Exception {
        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();
        testEntity.setId(count.incrementAndGet());

        // Create the TestEntity
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTestEntityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTestEntity() throws Exception {
        int databaseSizeBeforeUpdate = testEntityRepository.findAll().size();
        testEntity.setId(count.incrementAndGet());

        // Create the TestEntity
        TestEntityDTO testEntityDTO = testEntityMapper.toDto(testEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTestEntityMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(testEntityDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TestEntity in the database
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTestEntity() throws Exception {
        // Initialize the database
        testEntityRepository.saveAndFlush(testEntity);

        int databaseSizeBeforeDelete = testEntityRepository.findAll().size();

        // Delete the testEntity
        restTestEntityMockMvc
            .perform(delete(ENTITY_API_URL_ID, testEntity.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TestEntity> testEntityList = testEntityRepository.findAll();
        assertThat(testEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
