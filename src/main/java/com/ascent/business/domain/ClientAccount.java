package com.ascent.business.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ClientAccount.
 */
@Entity
@Table(name = "client_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ClientAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "ref_id", nullable = false)
    private String refId;

    @Column(name = "shortname")
    private String shortname;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "trxn_status")
    private String trxnStatus;

    @Column(name = "reference_name")
    private String referenceName;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "currency")
    private String currency;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ClientAccount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefId() {
        return this.refId;
    }

    public ClientAccount refId(String refId) {
        this.setRefId(refId);
        return this;
    }

    public void setRefId(String refId) {
        this.refId = refId;
    }

    public String getShortname() {
        return this.shortname;
    }

    public ClientAccount shortname(String shortname) {
        this.setShortname(shortname);
        return this;
    }

    public void setShortname(String shortname) {
        this.shortname = shortname;
    }

    public String getMiddleName() {
        return this.middleName;
    }

    public ClientAccount middleName(String middleName) {
        this.setMiddleName(middleName);
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getTrxnStatus() {
        return this.trxnStatus;
    }

    public ClientAccount trxnStatus(String trxnStatus) {
        this.setTrxnStatus(trxnStatus);
        return this;
    }

    public void setTrxnStatus(String trxnStatus) {
        this.trxnStatus = trxnStatus;
    }

    public String getReferenceName() {
        return this.referenceName;
    }

    public ClientAccount referenceName(String referenceName) {
        this.setReferenceName(referenceName);
        return this;
    }

    public void setReferenceName(String referenceName) {
        this.referenceName = referenceName;
    }

    public Integer getAmount() {
        return this.amount;
    }

    public ClientAccount amount(Integer amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return this.currency;
    }

    public ClientAccount currency(String currency) {
        this.setCurrency(currency);
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public ClientAccount isActive(Boolean isActive) {
        this.setIsActive(isActive);
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean getIsEnabled() {
        return this.isEnabled;
    }

    public ClientAccount isEnabled(Boolean isEnabled) {
        this.setIsEnabled(isEnabled);
        return this;
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClientAccount)) {
            return false;
        }
        return id != null && id.equals(((ClientAccount) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClientAccount{" +
            "id=" + getId() +
            ", refId='" + getRefId() + "'" +
            ", shortname='" + getShortname() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", trxnStatus='" + getTrxnStatus() + "'" +
            ", referenceName='" + getReferenceName() + "'" +
            ", amount=" + getAmount() +
            ", currency='" + getCurrency() + "'" +
            ", isActive='" + getIsActive() + "'" +
            ", isEnabled='" + getIsEnabled() + "'" +
            "}";
    }
}
