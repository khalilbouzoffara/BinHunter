import os

class Config:
    # General Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'mysecret')
    DEBUG = False
    TESTING = False

    # File upload configuration
    MAX_CONTENT_LENGTH = 100 * 1024 * 1024  # 100 MB limit for file uploads

    # Necessary folders
    UPLOAD_FOLDER = './src/static/uploads'
    EXTRACT_FOLDER = './src/static/extractions'
    LOG_EXTRACT_FOLDER = './src/static/logs'

    # Binwalk path
    BINWALK_PATH = '/usr/local/bin/binwalk'

    # Allowed MIME types for firmware files
    ALLOWED_MIME_TYPES = [
        'application/octet-stream',     # .bin files
        'application/x-hex',            # .hex files
        'application/zip',              # .zip files
        'application/x-bzip',           # BZip archive
        'application/x-bzip2',          # BZip2 archive
        'application/gzip',             # GZip Archive
        'application/vnd.rar',          # rar archive
        'application/x-tar',            # Tape Archive
        'application/x-7z-compressed'   # 7-zip archive
]

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True

class ProductionConfig(Config):
    # Production-specific settings
    # For example, you might want to use a different upload folder in production
    UPLOAD_FOLDER = '/var/binwalk/uploads'
    EXTRACT_FOLDER = '/var/binwalk/extractions'

# Dictionary to easily select the desired configuration
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}