ARG PYTHON_VERSION=3.11.4
FROM python:${PYTHON_VERSION}-slim AS base

# Prevents Python from writing pyc files and keeps Python from buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

#ENV USERNAME=binhunter-app
WORKDIR /app


# Install system dependencies for Binwalk and Flask
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    libfontconfig1-dev \
    liblzma-dev \
    python3-pip && \
    apt-get clean

# Install Rust and make sure the environment is loaded
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    echo 'source $HOME/.cargo/env' >> /root/.bashrc

# Source Rust environment and clone Binwalk
RUN /bin/bash -c "source $HOME/.cargo/env && \
    git clone https://github.com/ReFirmLabs/binwalk /tmp/binwalk && \
    /tmp/binwalk/dependencies/ubuntu.sh && \
    cd /tmp/binwalk && cargo build --release && \
    cp target/release/binwalk /usr/local/bin/binwalk && \
    rm -rf /tmp/binwalk"

# Copy the Flask application code into the container
COPY . /app

# Install Python dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Create necessary directories with correct permissions
#RUN mkdir -p ./src/static/uploads ./src/static/extractions ./src/static/logs && \
    #chmod -R 777 ./src/static/uploads ./src/static/extractions ./src/static/logs

#RUN chown -R appuser:appuser /app/src/static/uploads /app/src/static/extractions /app/src/static/logs


# Switch to the non-privileged user to run the application
#USER appuser

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
  