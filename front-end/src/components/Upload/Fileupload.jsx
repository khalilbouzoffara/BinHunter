import React, { useState, useRef } from "react";
import { LinearProgress } from "@mui/material";

const Fileupload = () => {
  const [selectedFile, setSelectedFile] = useState(null); // Stores the selected file
  const [uploadProgress, setUploadProgress] = useState(0); // Upload progress
  const [isUploading, setIsUploading] = useState(false); // Upload state

  const fileInputRef = useRef(null); // Ref to access the hidden input

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadProgress(0); // Reset progress on new file selection
    }
  };

  // Trigger the file input click when the button is clicked
  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  // Simulate file upload
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    setIsUploading(true); // Start upload
    setUploadProgress(0); // Reset progress

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop when progress reaches 100%
          setIsUploading(false); // End upload
          return 100;
        }
        return prev + 10; // Increment progress
      });
    }, 500); // Update every 500ms
  };

  const handleCancel = () => {
    setSelectedFile(null); // Reset file selection
    setUploadProgress(0); // Reset progress
    setIsUploading(false); // Stop upload if in progress
  };

  return (
    <div class="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
      <h2 class="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
        New Scan
      </h2>
      <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
        Upload a binary to scan for vulnerabilities
      </p>
      <div class="flex flex-col p-4">
        <div class="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#354f64] px-6 py-14">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <p className="text-white text-lg font-bold">
            {selectedFile
              ? selectedFile.name
              : "Drag and drop or select a file"}
          </p>
          <p class="text-[#94b0c7] text-sm font-normal leading-normal pb-3 pt-1 px-4">
          Maximum size : 100MB
            
          </p>
          <button
            onClick={handleSelectFile}
            className="h-10 px-4 bg-[#253746] text-white text-sm font-bold rounded-xl"
          >
            Select a File
          </button>
        </div>
      </div>
      <p class="text-[#94b0c7] text-sm font-normal leading-normal pb-3 pt-1 px-4">
        Supported file types: .zip, .tar.gz, .tar.bz2, .tar.xz, .tgz
      </p>

      {isUploading && (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-6 justify-between">
            <p className="text-white text-base font-medium leading-normal">
              Uploading your file
            </p>
            <p className="text-white text-sm font-normal leading-normal">
              {uploadProgress}%
            </p>
          </div>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            style={{ height: 8, borderRadius: 4, backgroundColor: "#354f64" }}
            sx={{ "& .MuiLinearProgress-bar": { backgroundColor: "#197bcc" } }}
          />
          <p className="text-[#94b0c7] text-sm font-normal leading-normal">
            This may take a few minutes
          </p>
        </div>
      )}

      <div class="flex max-w-[960px] flex-1 flex-col">
        <div class="flex px-4 py-3 justify-end">
          <div class="pr-4">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#197bcc] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">
                {isUploading ? "Uploading..." : "Upload"}
              </span>
            </button>
          </div>
          <button
            onClick={handleCancel}
            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#253746] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span class="truncate">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fileupload;
