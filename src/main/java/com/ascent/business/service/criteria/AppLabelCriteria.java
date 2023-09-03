package com.ascent.business.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.ascent.business.domain.AppLabel} entity. This class is used
 * in {@link com.ascent.business.web.rest.AppLabelResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /app-labels?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AppLabelCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter key;

    private StringFilter value;

    private LongFilter languageId;

    private Boolean distinct;

    public AppLabelCriteria() {}

    public AppLabelCriteria(AppLabelCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.key = other.key == null ? null : other.key.copy();
        this.value = other.value == null ? null : other.value.copy();
        this.languageId = other.languageId == null ? null : other.languageId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AppLabelCriteria copy() {
        return new AppLabelCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getKey() {
        return key;
    }

    public StringFilter key() {
        if (key == null) {
            key = new StringFilter();
        }
        return key;
    }

    public void setKey(StringFilter key) {
        this.key = key;
    }

    public StringFilter getValue() {
        return value;
    }

    public StringFilter value() {
        if (value == null) {
            value = new StringFilter();
        }
        return value;
    }

    public void setValue(StringFilter value) {
        this.value = value;
    }

    public LongFilter getLanguageId() {
        return languageId;
    }

    public LongFilter languageId() {
        if (languageId == null) {
            languageId = new LongFilter();
        }
        return languageId;
    }

    public void setLanguageId(LongFilter languageId) {
        this.languageId = languageId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final AppLabelCriteria that = (AppLabelCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(key, that.key) &&
            Objects.equals(value, that.value) &&
            Objects.equals(languageId, that.languageId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, key, value, languageId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppLabelCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (key != null ? "key=" + key + ", " : "") +
            (value != null ? "value=" + value + ", " : "") +
            (languageId != null ? "languageId=" + languageId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
