package com.ascent.business.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.ascent.business.domain.ClientAccount} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ClientAccountDTO implements Serializable {

    private Long id;

    @NotNull
    private String refId;

    private String shortname;

    private String middleName;

    private String trxnStatus;

    private String referenceName;

    private Integer amount;

    private String currency;

    private Boolean isActive;

    private Boolean isEnabled;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefId() {
        return refId;
    }

    public void setRefId(String refId) {
        this.refId = refId;
    }

    public String getShortname() {
        return shortname;
    }

    public void setShortname(String shortname) {
        this.shortname = shortname;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getTrxnStatus() {
        return trxnStatus;
    }

    public void setTrxnStatus(String trxnStatus) {
        this.trxnStatus = trxnStatus;
    }

    public String getReferenceName() {
        return referenceName;
    }

    public void setReferenceName(String referenceName) {
        this.referenceName = referenceName;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClientAccountDTO)) {
            return false;
        }

        ClientAccountDTO clientAccountDTO = (ClientAccountDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, clientAccountDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClientAccountDTO{" +
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
