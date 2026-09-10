package com.naadagangaa.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "user")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String mobile;
    private String address;
    private LocalDate birth;
    private Boolean enabled;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Account account;
}
