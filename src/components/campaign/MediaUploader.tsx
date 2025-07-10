"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Image as ImageIcon, Video, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

interface MediaUploaderProps {
  onMediaChange?: (media: MediaFile[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  initialMedia?: MediaFile[];
}

const MediaUploader = ({
  onMediaChange = () => {},
  maxFiles = 5,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"],
  initialMedia = [],
}: MediaUploaderProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMedia);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging],
  );

  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      setError(null);

      // Check if adding these files would exceed the limit
      if (mediaFiles.length + files.length > maxFiles) {
        setError(`You can only upload a maximum of ${maxFiles} files`);
        return;
      }

      const newMediaFiles: MediaFile[] = [];

      Array.from(files).forEach((file) => {
        // Check file type
        if (!acceptedFileTypes.includes(file.type)) {
          setError(`File type ${file.type} is not supported`);
          return;
        }

        // Check file size (limit to 10MB)
        if (file.size > 10 * 1024 * 1024) {
          setError("Files must be less than 10MB");
          return;
        }

        const fileType = file.type.startsWith("image/") ? "image" : "video";
        const preview = URL.createObjectURL(file);

        newMediaFiles.push({
          id: `${Date.now()}-${file.name}`,
          file,
          preview,
          type: fileType,
        });
      });

      const updatedMediaFiles = [...mediaFiles, ...newMediaFiles];
      setMediaFiles(updatedMediaFiles);
      onMediaChange(updatedMediaFiles);
    },
    [mediaFiles, maxFiles, acceptedFileTypes, onMediaChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const { files } = e.dataTransfer;
      processFiles(files);
    },
    [processFiles],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      processFiles(files);
      // Reset the input value so the same file can be uploaded again if removed
      e.target.value = "";
    },
    [processFiles],
  );

  const removeFile = useCallback(
    (id: string) => {
      const updatedFiles = mediaFiles.filter((file) => file.id !== id);
      setMediaFiles(updatedFiles);
      onMediaChange(updatedFiles);

      // Revoke the object URL to avoid memory leaks
      const fileToRemove = mediaFiles.find((file) => file.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
    },
    [mediaFiles, onMediaChange],
  );

  return (
    <div className="w-full space-y-4 bg-background">
      <div
        className={cn(
          "relative flex min-h-[200px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Drag and drop files here or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF, MP4 (Max {maxFiles} files, 10MB
              each)
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Select Files
          </Button>
          <input
            id="file-upload"
            type="file"
            multiple
            accept={acceptedFileTypes.join(",")}
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {mediaFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Uploaded Media ({mediaFiles.length}/{maxFiles})
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {mediaFiles.map((media) => (
              <Card key={media.id} className="overflow-hidden">
                <div className="relative aspect-video w-full bg-muted">
                  {media.type === "image" ? (
                    <img
                      src={media.preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      src={media.preview}
                      controls
                      className="h-full w-full object-cover"
                    />
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7"
                    onClick={() => removeFile(media.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <p className="truncate text-sm">{media.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(media.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </CardContent>
              </Card>
            ))}

            {mediaFiles.length < maxFiles && (
              <Card
                className="flex h-full min-h-[200px] cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 hover:bg-primary/5"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <div className="flex flex-col items-center justify-center space-y-2 p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Add More</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
