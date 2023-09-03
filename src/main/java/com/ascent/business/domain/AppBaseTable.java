package com.ascent.business.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AppBaseTable.
 */
@Entity
@Table(name = "app_base_table")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AppBaseTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "uuid", nullable = false, unique = true)
    private String uuid;

    @Lob
    @Column(name = "view_config", nullable = false)
    private String viewConfig;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AppBaseTable id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return this.uuid;
    }

    public AppBaseTable uuid(String uuid) {
        this.setUuid(uuid);
        return this;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getViewConfig() {
        return this.viewConfig;
    }

    public AppBaseTable viewConfig(String viewConfig) {
        this.setViewConfig(viewConfig);
        return this;
    }

    public void setViewConfig(String viewConfig) {
        this.viewConfig = viewConfig;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppBaseTable)) {
            return false;
        }
        return id != null && id.equals(((AppBaseTable) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppBaseTable{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", viewConfig='" + getViewConfig() + "'" +
            "}";
    }
}
