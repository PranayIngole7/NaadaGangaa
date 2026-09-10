package com.naadagangaa.controller;

import com.naadagangaa.dto.ApiResponse;
import com.naadagangaa.entity.Album;
import com.naadagangaa.repository.AlbumRepository;
import com.naadagangaa.service.FileStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin(origins = "*")
public class AlbumController {

    private final AlbumRepository albumRepository;
    private final FileStorageService fileStorageService;

    public AlbumController(AlbumRepository albumRepository, FileStorageService fileStorageService) {
        this.albumRepository = albumRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Album>>> getAllAlbums() {
        return ResponseEntity.ok(ApiResponse.success(albumRepository.findAll(), "Albums retrieved"));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Album>> uploadAlbum(
            @RequestParam("title") String title,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) {
        try {
            Album album = new Album();
            album.setTitle(title);
            if (thumbnail != null && !thumbnail.isEmpty()) {
                String fileName = fileStorageService.storeFile(thumbnail);
                album.setThumbnail("/uploads/" + fileName);
            }
            Album saved = albumRepository.save(album);
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(saved, "Album created"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Album upload failed: " + e.getMessage()));
        }
    }
}