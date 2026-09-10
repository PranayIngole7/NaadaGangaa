package com.naadagangaa.controller;

import com.naadagangaa.dto.ApiResponse;
import com.naadagangaa.entity.Album;
import com.naadagangaa.entity.Song;
import com.naadagangaa.repository.AlbumRepository;
import com.naadagangaa.repository.SongRepository;
import com.naadagangaa.service.FileStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "*")
public class SongController {

    private final SongRepository songRepository;
    private final AlbumRepository albumRepository;
    private final FileStorageService fileStorageService;

    public SongController(SongRepository songRepository, AlbumRepository albumRepository, FileStorageService fileStorageService) {
        this.songRepository = songRepository;
        this.albumRepository = albumRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Song>>> getAllSongs() {
        List<Song> songs = songRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success(songs, "Songs retrieved successfully"));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Song>> uploadSong(
            @RequestParam("title") String title,
            @RequestParam(value = "duration", defaultValue = "180") Integer duration,
            @RequestParam(value = "albumId", required = false) Long albumId,
            @RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.fail("Please select a valid file"));
            }
            String fileName = fileStorageService.storeFile(file);
            
            Song song = new Song();
            song.setTitle(title);
            song.setDuration(duration);
            song.setFile("/uploads/" + fileName);

            if (albumId != null) {
                Optional<Album> albumOpt = albumRepository.findById(albumId);
                albumOpt.ifPresent(song::setAlbum);
            }

            Song savedSong = songRepository.save(song);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(savedSong, "Song uploaded successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Upload error: " + e.getMessage()));
        }
    }
}