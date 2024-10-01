import os
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'bin', 'zip', 'tar', 'gz'}

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_uploaded_file(file, upload_folder):
    """Save the uploaded file to the server."""
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)
        return file_path
    else:
        raise ValueError("Invalid file type.")

def create_extraction_folder(output_dir):
    """Create the extraction folder if it doesn't exist."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    return output_dir
