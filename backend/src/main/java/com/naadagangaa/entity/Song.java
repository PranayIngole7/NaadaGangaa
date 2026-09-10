package com.naadagangaa.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "song")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String file;
    private Integer duration;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "album_id", nullable = true)
    @JsonIgnoreProperties({"songs", "hibernateLazyInitializer", "handler"})
    private Album album;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "song_artist",
        joinColumns = @JoinColumn(name = "song_id"),
        inverseJoinColumns = @JoinColumn(name = "artist_id")
    )
    @JsonIgnoreProperties({"songs", "hibernateLazyInitializer", "handler"})
    private List<Artist> artists;

    public Song() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getFile() { return file; }
    public void setFile(String file) { this.file = file; }

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }

    public Album getAlbum() { return album; }
    public void setAlbum(Album album) { this.album = album; }

    public List<Artist> getArtists() { return artists; }
    public void setArtists(List<Artist> artists) { this.artists = artists; }
}