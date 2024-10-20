from flask import Blueprint, request, jsonify, current_app
import os
import subprocess
from datetime import datetime
from ..services.parse_binwalk_out import parse_extract_output
import json

extract_bp = Blueprint('extract_bp', __name__)

@extract_bp.route('/extract', methods=['POST'])
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
        
        parsed_data = parse_extract_output(result.stdout)

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