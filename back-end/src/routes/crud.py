from flask import Blueprint, request, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from ..services.upload_checks import validate_mime_type, sha256_file, get_size
from ..models.firmware import Firmware
from ..database import db


crud_bp = Blueprint('crud_bp', __name__)

@crud_bp.route('/api/upload', methods=['POST'])
def upload():
    """Handle the firmware file upload securely."""
    
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Validate the MIME type of the file
    if not validate_mime_type(file) in current_app.config['ALLOWED_MIME_TYPES']:
        return jsonify({"error": "Invalid file type"}), 400

    # Sanitize the filename
    filename = secure_filename(file.filename)

    # Generate the SHA-256 hash of the file
    file_hash = sha256_file(file)

    # Create a new filename using the original name and SHA-256 hash
    hashed_filename = f"{filename}-{file_hash}"

    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], hashed_filename)
    
    # Check if the file already exists
    if os.path.exists(file_path):
        return jsonify({"message": "File already exists", "filename": file_hash}), 400
    
    # Save the file
    file.save(file_path)

    # Save the data
    firmware = Firmware( 
        firmware_name=filename, 
        size=get_size(file_path), 
        hash=file_hash
        )
    
    db.session.add(firmware)
    db.session.commit()

    return jsonify({"message": "Firmware uploaded successfully", 
                    "filename": filename, 
                    'hash': file_hash}), 200


@crud_bp.route('/api/firmwares', methods=['GET'])
def get_firmwares():
    """Retrieve all firmware entries."""
    firmwares = Firmware.query.all()
    return jsonify([fw.to_dict() for fw in firmwares]), 200