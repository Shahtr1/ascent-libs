package com.ascent.business.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.ascent.business.domain.AppProperties} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AppPropertiesDTO implements Serializable {

    private Long id;

    @NotNull
    private String uuid;

    @NotNull
    private String name;

    @NotNull
    private String value;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppPropertiesDTO)) {
            return false;
        }

        AppPropertiesDTO appPropertiesDTO = (AppPropertiesDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, appPropertiesDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppPropertiesDTO{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", name='" + getName() + "'" +
            ", value='" + getValue() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
