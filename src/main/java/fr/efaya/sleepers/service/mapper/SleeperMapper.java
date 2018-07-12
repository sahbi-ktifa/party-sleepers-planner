package fr.efaya.sleepers.service.mapper;

import fr.efaya.sleepers.domain.*;
import fr.efaya.sleepers.service.dto.SleeperDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Sleeper and its DTO SleeperDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface SleeperMapper extends EntityMapper<SleeperDTO, Sleeper> {

    @Mapping(source = "site.id", target = "siteId")
    @Mapping(source = "site.name", target = "siteName")
    SleeperDTO toDto(Sleeper sleeper);

    @Mapping(source = "siteId", target = "site")
    Sleeper toEntity(SleeperDTO sleeperDTO);

    default Sleeper fromId(Long id) {
        if (id == null) {
            return null;
        }
        Sleeper sleeper = new Sleeper();
        sleeper.setId(id);
        return sleeper;
    }
}
