package com.naadagangaa.model;

public record TrackDto(
    Long id, 
    String name, 
    Integer durationSeconds, 
    String genre, 
    Long albumId
) {}
