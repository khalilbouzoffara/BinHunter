from flask import Blueprint, request, jsonify, current_app
import os
import subprocess

entropy_bp = Blueprint('entropy_bp', __name__)

@entropy_bp.route('/api/entropy', methods=['POST'])
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