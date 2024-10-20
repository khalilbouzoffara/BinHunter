from ..database import db
from datetime import datetime, timezone
from sqlalchemy import event

class Firmware(db.Model):
    __tablename__ = 'firmwares'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firmware_name = db.Column(db.String(), unique=True, nullable=False)
    #architecture = db.Column(db.String(), nullable=False)
    size = db.Column(db.String(), nullable=False)
    hash = db.Column(db.String(), unique=True, nullable=False)
    uploaded_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, firmware_name, size, hash):
        self.firmware_name = firmware_name
        self.size = size
        self.hash = hash

    def to_dict(self):
        return {
            'firmware name': self.firmware_name,
            'size': self.size,
            'hash': self.hash

        }

    def __repr__(self):
        return f"<Firmware {self.firmware_name}>"

# Automatically set the uploaded_at field before inserting into the database
@event.listens_for(Firmware, 'before_insert')
def set_uploaded_at(mapper, connection, target):
    target.uploaded_at = datetime.now(timezone.utc)      