//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.service;

import io.grits.backend.config.FileStorageProperties;
import io.grits.backend.exception.FileStorageException;
import io.grits.backend.exception.GritsFileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
  private final Path fileStorageLocation;

  @Autowired
  public FileStorageService(FileStorageProperties fileStorageProperties) {
    this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

    try {
      Files.createDirectories(this.fileStorageLocation);
    } catch (Exception var3) {
      throw new FileStorageException("Could not create the directory to upload", var3);
    }
  }

  public String storeFile(MultipartFile file) {
    String fileName = StringUtils.cleanPath((String)Objects.requireNonNull(file.getOriginalFilename()));

    try {
      Path targetLocation = this.fileStorageLocation.resolve(fileName);
      Files.copy(file.getInputStream(), targetLocation, new CopyOption[]{StandardCopyOption.REPLACE_EXISTING});
      return fileName;
    } catch (IOException var4) {
      throw new FileStorageException("Could not store file " + fileName + ". Please try again !", var4);
    }
  }

  public Resource loadFileAsResource(String fileName) {
    try {
      Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
      Resource resource = new UrlResource(filePath.toUri());
      if (resource.exists()) {
        return resource;
      } else {
        throw new GritsFileNotFoundException("File not found " + fileName);
      }
    } catch (MalformedURLException var4) {
      throw new GritsFileNotFoundException("File not found " + fileName);
    }
  }
}
