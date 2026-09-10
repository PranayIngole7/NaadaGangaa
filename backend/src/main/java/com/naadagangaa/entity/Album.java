package com.naadagangaa.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "album")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String thumbnail;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    private List<Song> songs;
}
