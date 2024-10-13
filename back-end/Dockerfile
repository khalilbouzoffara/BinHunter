ARG PYTHON_VERSION=3.11.4
FROM python:${PYTHON_VERSION}-slim AS base

# Prevents Python from writing pyc files and keeps Python from buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Create a non-privileged user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Install system dependencies and Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    git \
    build-essential \
    libfontconfig1-dev \
    p7zip-full \
    zstd \
    unzip \
    tar \
    sleuthkit \
    cabextract \
    lz4 \
    lzop \
    device-tree-compiler \
    unrar-free \
    clang \
    liblzo2-dev \
    libucl-dev \
    liblz4-dev \
    liblzma-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Clone and build Binwalk v3
RUN git clone -b binwalkv3 https://github.com/ReFirmLabs/binwalk.git \
    && cd binwalk \
    && cargo build --release \
    && cp target/release/binwalk /usr/local/bin/ \
    && cd .. \
    && rm -rf binwalk

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Install additional dependencies
RUN pip install uefi_firmware jefferson ubi-reader python-magic

# Install Sasquatch
RUN curl -L -o sasquatch_1.0.deb "https://github.com/onekey-sec/sasquatch/releases/download/sasquatch-v4.5.1-4/sasquatch_1.0_amd64.deb" \
    && dpkg -i sasquatch_1.0.deb \
    && rm sasquatch_1.0.deb

# Install dumpifs
RUN git clone https://github.com/askac/dumpifs.git \
    && cd dumpifs \
    && make dumpifs \
    && cp ./dumpifs /usr/local/bin/dumpifs \
    && cd .. \
    && rm -rf dumpifs

# Install lzfse
RUN git clone https://github.com/lzfse/lzfse.git \
    && cd lzfse \
    && make install \
    && cd .. \
    && rm -rf lzfse

# Install srec2bin
RUN mkdir srec \
    && cd srec \
    && curl -O http://www.goffart.co.uk/s-record/download/srec_151_src.zip \
    && unzip srec_151_src.zip \
    && make \
    && cp srec2bin /usr/local/bin/ \
    && cd .. \
    && rm -rf srec

# Copy the source code into the container
COPY . .

# Create necessary directories with correct permissions
RUN mkdir -p ./src/static/uploads ./src/static/extractions ./src/static/logs && \
    chmod -R 777 ./src/static/uploads ./src/static/extractions ./src/static/logs

RUN chown -R appuser:appuser /app/src/static/uploads /app/src/static/extractions /app/src/static/logs


# Switch to the non-privileged user to run the application
USER appuser

#Flask ENV variables
ENV FLASK_APP=app.py

# Enable Flask auto-reloading
ENV FLASK_ENV=development   
ENV FLASK_RUN_HOST=0.0.0.0

# Expose the port that the application listens on
EXPOSE 5000

# Run the application using uvicorn
CMD [ "python3", "-m" , "flask", "run"]
  