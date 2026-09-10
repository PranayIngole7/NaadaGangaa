package com.naadagangaa.service;

import com.naadagangaa.model.Track;
import com.naadagangaa.model.TrackDto;
import com.naadagangaa.repository.AlbumRepository;
import com.naadagangaa.repository.TrackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TrackService {

    private final TrackRepository trackRepository;
    private final AlbumRepository albumRepository;

    public TrackService(TrackRepository trackRepository, AlbumRepository albumRepository) {
        this.trackRepository = trackRepository;
        this.albumRepository = albumRepository;
    }

    @Transactional(readOnly = true)
    public List<TrackDto> getAllTracks() {
        return trackRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public TrackDto getTrackById(Long id) {
        return trackRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Track not found with id: " + id));
    }

    @Transactional
    public TrackDto createTrack(TrackDto dto) {
        var track = new Track();
        track.setName(dto.name());
        track.setDurationSeconds(dto.durationSeconds());
        track.setGenre(dto.genre());

        if (dto.albumId() != null) {
            var album = albumRepository.findById(dto.albumId()).orElse(null);
            track.setAlbum(album);
        }

        var saved = trackRepository.save(track);
        return toDto(saved);
    }

    @Transactional
    public void deleteTrack(Long id) {
        trackRepository.deleteById(id);
    }

    private TrackDto toDto(Track track) {
        Long albumId = (track.getAlbum() != null) ? track.getAlbum().getId() : null;
        return new TrackDto(track.getId(), track.getName(), track.getDurationSeconds(), track.getGenre(), albumId);
    }
}
