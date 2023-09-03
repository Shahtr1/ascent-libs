package com.ascent.business.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.ascent.business.domain.AppBaseTable} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AppBaseTableDTO implements Serializable {

    private Long id;

    @NotNull
    private String uuid;

    @Lob
    private String viewConfig;

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

    public String getViewConfig() {
        return viewConfig;
    }

    public void setViewConfig(String viewConfig) {
        this.viewConfig = viewConfig;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppBaseTableDTO)) {
            return false;
        }

        AppBaseTableDTO appBaseTableDTO = (AppBaseTableDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, appBaseTableDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppBaseTableDTO{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", viewConfig='" + getViewConfig() + "'" +
            "}";
    }
}
