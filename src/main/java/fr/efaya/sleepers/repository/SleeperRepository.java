package fr.efaya.sleepers.repository;

import fr.efaya.sleepers.domain.Sleeper;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Sleeper entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SleeperRepository extends JpaRepository<Sleeper, Long> {

}
