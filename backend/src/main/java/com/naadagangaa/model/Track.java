package com.naadagangaa.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tracks")
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Integer durationSeconds;

    private String genre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;

    public Track() {}

    public Track(Long id, String name, Integer durationSeconds, String genre, Album album) {
        this.id = id;
        this.name = name;
        this.durationSeconds = durationSeconds;
        this.genre = genre;
        this.album = album;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public Album getAlbum() { return album; }
    public void setAlbum(Album album) { this.album = album; }
}
