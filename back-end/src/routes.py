from flask import Blueprint, request, jsonify, current_app
import os
import subprocess
from werkzeug.utils import secure_filename
from datetime import datetime
from .services.parse_binwalk_out import parse_bin_output
from .services.upload_checks import validate_mime_type, sha256_file
import json

main_bp = Blueprint('main', __name__)

@main_bp.route('/upload', methods=['POST'])
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
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_hash)
    
    # Check if the file already exists based on its hash
    if os.path.exists(file_path):
        return jsonify({"message": "File already exists", "filename": file_hash}), 400
    
    # Save the file
    file.save(file_path)

    return jsonify({"message": "Firmware uploaded successfully", 
                    "filename": filename, 
                    'hash': file_hash}), 200


@main_bp.route('/scan', methods=['POST'])
def scan():
    """Perform scan on the uploaded firmware file."""

    filename = request.json.get('filename')

    if not filename:
        return jsonify({"error": "Filename not provided"}), 400
    
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    # Run the binwalk scan
    try:
        result = subprocess.run([current_app.config['BINWALK_PATH'], file_path], capture_output=True, text=True)
        return jsonify({"output": result.stdout})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@main_bp.route('/extract', methods=['POST'])
def extract():
    """Perform extraction on the uploaded firmware file."""

    filename = request.json.get('filename')

    if not filename:
        return jsonify({"error": "Filename not provided"}), 400
    
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    # Use the specified output directory if provided, otherwise default
    output_dir = request.form.get('output_dir', current_app.config['EXTRACT_FOLDER'])
    os.makedirs(output_dir, exist_ok=True)

    # Run the binwalk extract
    try:
        result = subprocess.run([current_app.config['BINWALK_PATH'], "-Me", file_path, "--directory", output_dir], capture_output=True, text=True)
        
        parsed_data = parse_bin_output(result.stdout)

        #Generate log filename based on the original filename and timestamp
        log_filename = f"{filename}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        log_file_path = os.path.join(current_app.config['LOG_EXTRACT_FOLDER'], log_filename)

        # Save extraction result to json log file

        with open(log_file_path, 'w') as f:
            json.dump(parsed_data, f, indent=4)

        
        return jsonify({"message": "Firmware Extracted Successfully ", 
                        "Extraction data": parsed_data}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main_bp.route('/entropy', methods=['POST'])
def entropy():
    """Generate entropy for the uploaded firmware file."""

    filename = request.json.get('filename')

    if not filename:
        return jsonify({"error": "Filename not provided"}), 400
    
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    # Generate entropy graph
    try:
        # Define the output file path for entropy data
        entropy_output_file = os.path.join(current_app.config['UPLOAD_FOLDER'], 'entropy.png')

        result = subprocess.run([current_app.config['BINWALK_PATH'], '-E', '-o', entropy_output_file, file_path], capture_output=True, text=True)
        # Check for errors in Binwalk command execution
        if result.returncode != 0:
            return jsonify({"error": result.stderr}), 500
        
        return jsonify({
            "file": file_path,
            "message": "Entropy analysis complete",
            "entropy_image": entropy_output_file  # Path to entropy output file (image)
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


