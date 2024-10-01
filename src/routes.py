from flask import Blueprint, request, jsonify, current_app
import os
import subprocess

main_bp = Blueprint('main', __name__)

@main_bp.route('/scan', methods=['POST'])
def scan():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Run the binwalk scan
    try:
        result = subprocess.run([current_app.config['BINWALK_PATH'], file_path], capture_output=True, text=True)
        return jsonify({"output": result.stdout})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@main_bp.route('/extract', methods=['POST'])
def extract():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Use the specified output directory if provided, otherwise default
    output_dir = request.form.get('output_dir', current_app.config['EXTRACT_FOLDER'])
    os.makedirs(output_dir, exist_ok=True)

    # Run the binwalk extract
    try:
        result = subprocess.run([current_app.config['BINWALK_PATH'], "-Me", file_path, "--directory", output_dir], capture_output=True, text=True)
        return jsonify({"output": result.stdout, "extracted_files_location": output_dir})
        return 
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main_bp.route('/entropy', methods=['POST'])
def entropy():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Generate entropy graph
    try:
        result = subprocess.run([current_app.config['BINWALK_PATH'], "-E", file_path], capture_output=True, text=True)
        entropy_image = file.filename.replace(".bin", ".png")
        return jsonify({"output": result.stdout, "entropy_image": entropy_image})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
