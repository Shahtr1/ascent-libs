package com.ascent.business.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.ascent.business.domain.AppLabel} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AppLabelDTO implements Serializable {

    private Long id;

    @NotNull
    private String uuid;

    @NotNull
    private String value;

    private AppLanguageDTO language;

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

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public AppLanguageDTO getLanguage() {
        return language;
    }

    public void setLanguage(AppLanguageDTO language) {
        this.language = language;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppLabelDTO)) {
            return false;
        }

        AppLabelDTO appLabelDTO = (AppLabelDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, appLabelDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppLabelDTO{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", value='" + getValue() + "'" +
            ", language=" + getLanguage() +
            "}";
    }
}
