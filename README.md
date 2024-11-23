# BinHunter: Your Go-To Firmware Analysis Solution

## Overview

BinHunter is a powerful firmware analysis solution designed for penetration testers, security teams, developers, and product managers. It automates firmware extraction, static and dynamic analysis, and builds a comprehensive Software Bill of Materials (SBOM). BinHunter detects vulnerabilities such as outdated components, insecure binaries, misconfigured scripts, and hardcoded credentials.

## Features

- **Automated Firmware Extraction**: Extract and analyze firmware images from a variety of devices and formats.
- **Vulnerability Detection**: Automatically detect weak spots, including:
    * Outdated software components.
    * Identify known and zero day vulnerabilities in binaries
    * Hard-coded credentials.
    * Insecure scripts.
- **SBOM Generation**: Build a complete Software Bill of Materials to track dependencies and open-source components.
- **Web-Based Reports**: Generate comprehensive web reports for detailed analysis.
- **Extensible CLI Tool**: Integrates into automation pipelines.
 
## Prerequisites
- Docker 
## Installation
- Clone the repo :
```shell
git clone https://github.com/khalilbouzoffara/BinHunter.git
cd BinHunter
```
- Set the necessary settings:
    - `.env` file in `backend` directory.

- Run the app using docker compose:
```shell
docker compose up --build
```