ARG PYTHON_VERSION=3.11.4
FROM python:${PYTHON_VERSION}-slim AS base

# ARG variables for customization
ARG BINWALK_INSTALL_DIR="/tmp/binwalk"
ARG REPO_URL="https://github.com/ReFirmLabs/binwalk.git"

# Set environment variables for Python and Rust
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    BINWALK_RM_EXTRACTION_SYMLINK=1

# Set working directory to /tmp during the setup process
WORKDIR /tmp

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    libmagic1 \
    build-essential \
    libfontconfig1-dev \
    liblzma-dev \
    python3-pip && \
    apt-get clean

# Clone the repository containing Binwalk
RUN git clone ${REPO_URL} ${BINWALK_INSTALL_DIR}

# Copy over the Binwalk build directory
RUN mkdir -p ${BINWALK_INSTALL_DIR}
COPY . ${BINWALK_INSTALL_DIR}

# Allow pip to install packages system-wide
RUN mkdir -p $HOME/.config/pip && echo "[global]" > $HOME/.config/pip/pip.conf && echo "break-system-packages = true" >> $HOME/.config/pip/pip.conf

# Install Binwalk dependencies using its Ubuntu script
RUN ${BINWALK_INSTALL_DIR}/dependencies/ubuntu.sh

# Install Rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

# Build and install Binwalk
RUN cd ${BINWALK_INSTALL_DIR} && /root/.cargo/bin/cargo build --release && cp ./target/release/binwalk /usr/local/bin/binwalk

# Clean up binwalk build directory
RUN rm -rf ${BINWALK_INSTALL_DIR}

WORKDIR /app

# Copy the Flask application code into the container
COPY . /app

# Install Python dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Install additional dependencies
RUN pip install uefi_firmware jefferson ubi-reader python-magic flask-cors python-dotenv

#Flask ENV variables
ENV FLASK_APP=app.py

# Enable Flask auto-reloading
ENV FLASK_ENV=development   
ENV FLASK_RUN_HOST=0.0.0.0

# Expose the port that the application listens on
EXPOSE 5000

RUN chmod +x /app/entrypoint.sh

# Set the entrypoint for the container
ENTRYPOINT ["/app/entrypoint.sh"]

# Default command to start the Flask app
CMD [ "python3", "-m" , "flask", "run"]
