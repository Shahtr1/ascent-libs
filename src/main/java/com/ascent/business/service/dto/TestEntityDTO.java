package com.ascent.business.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.ascent.business.domain.TestEntity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TestEntityDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3)
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TestEntityDTO)) {
            return false;
        }

        TestEntityDTO testEntityDTO = (TestEntityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, testEntityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TestEntityDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
