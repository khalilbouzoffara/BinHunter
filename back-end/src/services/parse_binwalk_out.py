import re

def parse_extract_output(text):
    """Parse files with extraxt results"""
    # Split by each section based on paths
    sections = re.split(r'\/app\/src\/static\/extractions\/', text)[1:]
    
    output_data = []
    for section in sections:
        # Extract the file path
        file_path = '/app/src/static/extractions/' + section.splitlines()[0].strip()
        
        # Find the description table
        table = re.findall(r'(\d+)\s+0x([0-9A-Fa-f]+)\s+(.+)', section)
        data_list = []
        for entry in table:
            decimal, hexadecimal, description = entry
            data_list.append({
                'decimal': int(decimal),
                'hexadecimal': '0x' + hexadecimal,
                'description': description.strip()
            })
        
        # Check for completion messages
        completion_messages = re.findall(r'\[\+\] Extraction of .+ completed successfully', section)
        
        output_data.append({
            'file_path': file_path,
            'extracted_data': data_list,
            'completion_messages': completion_messages
        })
    
    return output_data

def parse_scan_file(text):
    """Parse files with scan results"""
    sections = re.split(r'\/app\/src\/static\/uploads\/', text)[1:]

    output_data = []
    for section in sections:
        file_path = '/app/src/static/uploads/' + section.splitlines()[0].strip()

        table = re.findall(r'(\d+)\s+0x([0-9A-Fa-f]+)\s+(.+)', section)
        data_list = [
            {'decimal': int(d), 'hexadecimal': f"0x{hx}", 'description': desc.strip()}
            for d, hx, desc in table
        ]

        output_data.append({
            'file_path': file_path,
            'scanned_data': data_list
        })

    return output_data