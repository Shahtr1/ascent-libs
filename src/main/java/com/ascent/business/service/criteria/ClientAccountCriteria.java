package com.ascent.business.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.ascent.business.domain.ClientAccount} entity. This class is used
 * in {@link com.ascent.business.web.rest.ClientAccountResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /client-accounts?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ClientAccountCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter refId;

    private StringFilter shortname;

    private StringFilter middleName;

    private StringFilter trxnStatus;

    private StringFilter referenceName;

    private IntegerFilter amount;

    private StringFilter currency;

    private BooleanFilter isActive;

    private BooleanFilter isEnabled;

    private Boolean distinct;

    public ClientAccountCriteria() {}

    public ClientAccountCriteria(ClientAccountCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.refId = other.refId == null ? null : other.refId.copy();
        this.shortname = other.shortname == null ? null : other.shortname.copy();
        this.middleName = other.middleName == null ? null : other.middleName.copy();
        this.trxnStatus = other.trxnStatus == null ? null : other.trxnStatus.copy();
        this.referenceName = other.referenceName == null ? null : other.referenceName.copy();
        this.amount = other.amount == null ? null : other.amount.copy();
        this.currency = other.currency == null ? null : other.currency.copy();
        this.isActive = other.isActive == null ? null : other.isActive.copy();
        this.isEnabled = other.isEnabled == null ? null : other.isEnabled.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ClientAccountCriteria copy() {
        return new ClientAccountCriteria(this);
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

    public StringFilter getRefId() {
        return refId;
    }

    public StringFilter refId() {
        if (refId == null) {
            refId = new StringFilter();
        }
        return refId;
    }

    public void setRefId(StringFilter refId) {
        this.refId = refId;
    }

    public StringFilter getShortname() {
        return shortname;
    }

    public StringFilter shortname() {
        if (shortname == null) {
            shortname = new StringFilter();
        }
        return shortname;
    }

    public void setShortname(StringFilter shortname) {
        this.shortname = shortname;
    }

    public StringFilter getMiddleName() {
        return middleName;
    }

    public StringFilter middleName() {
        if (middleName == null) {
            middleName = new StringFilter();
        }
        return middleName;
    }

    public void setMiddleName(StringFilter middleName) {
        this.middleName = middleName;
    }

    public StringFilter getTrxnStatus() {
        return trxnStatus;
    }

    public StringFilter trxnStatus() {
        if (trxnStatus == null) {
            trxnStatus = new StringFilter();
        }
        return trxnStatus;
    }

    public void setTrxnStatus(StringFilter trxnStatus) {
        this.trxnStatus = trxnStatus;
    }

    public StringFilter getReferenceName() {
        return referenceName;
    }

    public StringFilter referenceName() {
        if (referenceName == null) {
            referenceName = new StringFilter();
        }
        return referenceName;
    }

    public void setReferenceName(StringFilter referenceName) {
        this.referenceName = referenceName;
    }

    public IntegerFilter getAmount() {
        return amount;
    }

    public IntegerFilter amount() {
        if (amount == null) {
            amount = new IntegerFilter();
        }
        return amount;
    }

    public void setAmount(IntegerFilter amount) {
        this.amount = amount;
    }

    public StringFilter getCurrency() {
        return currency;
    }

    public StringFilter currency() {
        if (currency == null) {
            currency = new StringFilter();
        }
        return currency;
    }

    public void setCurrency(StringFilter currency) {
        this.currency = currency;
    }

    public BooleanFilter getIsActive() {
        return isActive;
    }

    public BooleanFilter isActive() {
        if (isActive == null) {
            isActive = new BooleanFilter();
        }
        return isActive;
    }

    public void setIsActive(BooleanFilter isActive) {
        this.isActive = isActive;
    }

    public BooleanFilter getIsEnabled() {
        return isEnabled;
    }

    public BooleanFilter isEnabled() {
        if (isEnabled == null) {
            isEnabled = new BooleanFilter();
        }
        return isEnabled;
    }

    public void setIsEnabled(BooleanFilter isEnabled) {
        this.isEnabled = isEnabled;
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
        final ClientAccountCriteria that = (ClientAccountCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(refId, that.refId) &&
            Objects.equals(shortname, that.shortname) &&
            Objects.equals(middleName, that.middleName) &&
            Objects.equals(trxnStatus, that.trxnStatus) &&
            Objects.equals(referenceName, that.referenceName) &&
            Objects.equals(amount, that.amount) &&
            Objects.equals(currency, that.currency) &&
            Objects.equals(isActive, that.isActive) &&
            Objects.equals(isEnabled, that.isEnabled) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, refId, shortname, middleName, trxnStatus, referenceName, amount, currency, isActive, isEnabled, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClientAccountCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (refId != null ? "refId=" + refId + ", " : "") +
            (shortname != null ? "shortname=" + shortname + ", " : "") +
            (middleName != null ? "middleName=" + middleName + ", " : "") +
            (trxnStatus != null ? "trxnStatus=" + trxnStatus + ", " : "") +
            (referenceName != null ? "referenceName=" + referenceName + ", " : "") +
            (amount != null ? "amount=" + amount + ", " : "") +
            (currency != null ? "currency=" + currency + ", " : "") +
            (isActive != null ? "isActive=" + isActive + ", " : "") +
            (isEnabled != null ? "isEnabled=" + isEnabled + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
