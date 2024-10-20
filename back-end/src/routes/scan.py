from flask import Blueprint, request, jsonify, current_app
import os
from ..services.parse_binwalk_out import parse_scan_file
import subprocess

scan_bp = Blueprint('scan_bp', __name__)

@scan_bp.route('/scan', methods=['POST'])
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
        parsed_data = parse_scan_file(result.stdout)

        return jsonify({"output": parsed_data})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500