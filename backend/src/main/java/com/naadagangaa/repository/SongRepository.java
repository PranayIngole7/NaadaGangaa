package com.naadagangaa.repository;

import com.naadagangaa.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByAlbumId(Long albumId);
    List<Song> findByTitleContainingIgnoreCase(String title);
}