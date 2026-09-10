package com.naadagangaa.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "artist")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String thumbnail;
    private String type;

    @ManyToMany(mappedBy = "artists")
    private Set<Song> songs;
}
