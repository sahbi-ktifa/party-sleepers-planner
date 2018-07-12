package fr.efaya.sleepers.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Sleeper entity.
 */
public class SleeperDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Long siteId;

    private String siteName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long locationId) {
        this.siteId = locationId;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String locationName) {
        this.siteName = locationName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SleeperDTO sleeperDTO = (SleeperDTO) o;
        if (sleeperDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sleeperDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SleeperDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", site=" + getSiteId() +
            ", site='" + getSiteName() + "'" +
            "}";
    }
}
