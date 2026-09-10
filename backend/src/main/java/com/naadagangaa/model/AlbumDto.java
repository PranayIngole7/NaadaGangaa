package com.naadagangaa.model;

import java.util.List;

public record AlbumDto(
    Long id, 
    String title, 
    String artist, 
    Integer releaseYear, 
    List<TrackDto> tracks
) {}
