package com.ascent.business.service.criteria;

import com.ascent.business.domain.enumeration.LanguageDirection;
import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.ascent.business.domain.AppLanguage} entity. This class is used
 * in {@link com.ascent.business.web.rest.AppLanguageResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /app-languages?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AppLanguageCriteria implements Serializable, Criteria {

    /**
     * Class for filtering LanguageDirection
     */
    public static class LanguageDirectionFilter extends Filter<LanguageDirection> {

        public LanguageDirectionFilter() {}

        public LanguageDirectionFilter(LanguageDirectionFilter filter) {
            super(filter);
        }

        @Override
        public LanguageDirectionFilter copy() {
            return new LanguageDirectionFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter uuid;

    private StringFilter name;

    private LanguageDirectionFilter direction;

    private Boolean distinct;

    public AppLanguageCriteria() {}

    public AppLanguageCriteria(AppLanguageCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.uuid = other.uuid == null ? null : other.uuid.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.direction = other.direction == null ? null : other.direction.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AppLanguageCriteria copy() {
        return new AppLanguageCriteria(this);
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

    public StringFilter getUuid() {
        return uuid;
    }

    public StringFilter uuid() {
        if (uuid == null) {
            uuid = new StringFilter();
        }
        return uuid;
    }

    public void setUuid(StringFilter uuid) {
        this.uuid = uuid;
    }

    public StringFilter getName() {
        return name;
    }

    public StringFilter name() {
        if (name == null) {
            name = new StringFilter();
        }
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public LanguageDirectionFilter getDirection() {
        return direction;
    }

    public LanguageDirectionFilter direction() {
        if (direction == null) {
            direction = new LanguageDirectionFilter();
        }
        return direction;
    }

    public void setDirection(LanguageDirectionFilter direction) {
        this.direction = direction;
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
        final AppLanguageCriteria that = (AppLanguageCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(uuid, that.uuid) &&
            Objects.equals(name, that.name) &&
            Objects.equals(direction, that.direction) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, uuid, name, direction, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AppLanguageCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (uuid != null ? "uuid=" + uuid + ", " : "") +
            (name != null ? "name=" + name + ", " : "") +
            (direction != null ? "direction=" + direction + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
