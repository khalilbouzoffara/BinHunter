import re

def parse_bin_output(text):
    # Split by each section based on paths (e.g., '/app/src/static/extractions/...')
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
