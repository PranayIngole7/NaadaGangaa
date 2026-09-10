package com.naadagangaa.service;

import com.naadagangaa.model.Album;
import com.naadagangaa.model.AlbumDto;
import com.naadagangaa.model.TrackDto;
import com.naadagangaa.repository.AlbumRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class AlbumService {

    private final AlbumRepository albumRepository;

    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Transactional(readOnly = true)
    public List<AlbumDto> getAllAlbums() {
        return albumRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public AlbumDto getAlbumById(Long id) {
        return albumRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Album not found with id: " + id));
    }

    @Transactional
    public AlbumDto createAlbum(AlbumDto dto) {
        var album = new Album();
        album.setTitle(dto.title());
        album.setArtist(dto.artist());
        album.setReleaseYear(dto.releaseYear());

        var saved = albumRepository.save(album);
        return toDto(saved);
    }

    @Transactional
    public void deleteAlbum(Long id) {
        albumRepository.deleteById(id);
    }

    private AlbumDto toDto(Album album) {
        List<TrackDto> tracks = (album.getTracks() != null)
                ? album.getTracks().stream()
                    .map(t -> new TrackDto(t.getId(), t.getName(), t.getDurationSeconds(), t.getGenre(), album.getId()))
                    .toList()
                : Collections.emptyList();

        return new AlbumDto(album.getId(), album.getTitle(), album.getArtist(), album.getReleaseYear(), tracks);
    }
}
