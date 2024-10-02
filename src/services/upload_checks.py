import magic
import hashlib

def validate_mime_type(file):
    """Check if the file's MIME type is allowed."""
    mime = magic.Magic(mime=True)
    mime_type = mime.from_buffer(file.read(1024))  # Read first 1024 bytes for detection
    file.seek(0)  # Reset file pointer after reading for MIME check
    return mime_type

def sha256_file(file):
    """Generate SHA-256 hash of a file's contents."""
    hasher = hashlib.sha256()
    file.seek(0)  # Ensure the file pointer is at the start
    while chunk := file.read(8192):  # Read the file in chunks
        hasher.update(chunk)
    file.seek(0)  # Reset the file pointer after hashing
    return hasher.hexdigest()