package com.ascent.business.service.dto;

import com.ascent.business.domain.enumeration.LanguageDirection;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.ascent.business.domain.AppLanguage} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AppLanguageDTO implements Serializable {

    private Long id;

    @NotNull
    private String uuid;

    @NotNull
    private String name;

    @NotNull
    private LanguageDirection direction;

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

    public LanguageDirection getDirection() {
        return direction;
    }

    public void setDirection(LanguageDirection direction) {
        this.direction = direction;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppLanguageDTO)) {
            return false;
        }

        AppLanguageDTO appLanguageDTO = (AppLanguageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, appLanguageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppLanguageDTO{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", name='" + getName() + "'" +
            ", direction='" + getDirection() + "'" +
            "}";
    }
}
