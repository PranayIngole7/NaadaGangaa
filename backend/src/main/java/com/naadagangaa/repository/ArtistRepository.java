package com.naadagangaa.repository;

import com.naadagangaa.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    List<Artist> findByLastNameContainingIgnoreCase(String lastName);
}