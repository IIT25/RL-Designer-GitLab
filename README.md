# Team Aarhus University 2026 Software: RL designer

## Description
One of our key goals with the RiboLogic system is to create a new platform that could be easily fitted to new diseases. This presents the challenge that the system's sequence has to be often modified, for example to respond to different miRNAs, slowing down the adaptation process significantly. We have also found that the relatively scattered resources on miRNAs could also make the process cumbersome. To overcome these challenges we have created two software tools, one of which is RL Designer.
RL Designer is a web based software tool, for the creation of optimized sequences for RiboLogic and other RNA systems. It has a key role in this process as the RiboLogic system's functions depend on its folding. A key consideration through the software's design process was to make it accessible to a wide audience, so it has workflows with a range of different complexities, allowing users to gradually explore and learn its usage. Additionally it can be accessed both through the web interface and programmatically. While most users won't need an installation at all, instructions are provided under Installation for local deployment and for a full recreation of our production deployment. More information can be found at: https://2026.igem.wiki/aarhus-university/software

## Installation
RL Designer is easily available without any installation at https://rl-designer.online/. Still for many use cases it is important to have access to the exact deployment steps. This section details both a way for local deployment and records how our team created the production deployment. (CPU type: Please note that the interated AROS binary is for x86_64 only now, building for ARM can be done)
General requirements:
- Git: Install [Git](https://git-scm.com/install/)
- Node + npm: [Install Node + npm](https://nodejs.org/en/download) (Troubleshooting on windows: it might require an additional Set-ExecutionPolicy RemoteSigned)

**Local deployment:**
This option is for those who would like to deploy RL designer locally, for example to contribute to development.
Specific requirements:
 - uv:
    - Linux: ``curl -LsSf https://astral.sh/uv/install.sh | sh`` + Terminal restart
    - Windows: ``powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`` + Terminal restart

    
Installation Steps:
1. Clone the repository from the official iGEM GitLab: ``git clone https://gitlab.igem.org/2026/software/aarhus-university/rl-designer.git``
2. ``cd rl-designer``
3. ``npm install``
4. ``npm run dev:all``

**Recreate our current deployment:**
This part is mainly meant for future iGEM teams who want to build upon our code, and for people who want to fully recreate our production deployment from the source code. In order to keep it simple and consistent the project uses Docker containerized deployment and Docker Compose for unified dependency management and setup. It is currently deployed on [Hetzner](https://www.hetzner.com/), but it should be compatible with other providers as well.

Specific requirements:
- Docker + Docker Compose:
    - Linux: 
        ```# Install Docker using the official convenience script
        curl -fsSL https://get.docker.com | sh
        # Verify the installation
        docker --version
        # Docker Compose is now included in the Docker script, but if needed it can be installed in the following way.
        # Install Docker Compose plugin
        apt install docker-compose-plugin -y
        # Verify Compose
        docker compose version```
    - Windows: [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)


Installation Steps:
1. Clone the repository from the official iGEM GitLab: ``git clone https://gitlab.igem.org/2026/software/aarhus-university/rl-designer.git``
2. ``cd rl-designer``
3. ``In the .env file at the top level change the domain name to a domain that you have access to``
4. ``docker compose build``
5. ``docker compose up``

After the initial build, the containers can be stopped with:
``Ctrl+C`` in terminal where it was started
``docker compose down``

And can be rebuilt+started with:
``docker compose up --build``


## Usage
For usage instructions, please check out our tutorials on the wiki at the [Software Page](https://2026.igem.wiki/aarhus-university/software#tutorial_start)


## Contributing
We are open to contributions. If you happen to find a bug please open an issue with a minimal example of how to reproduce it.
For other types of contributions please first contact us at au804046@uni.au.dk.

## Authors and acknowledgment
ViennaRNA has been an important cornerstone of this project [https://github.com/ViennaRNA/ViennaRNA](https://github.com/ViennaRNA/ViennaRNA)
Besides this we would like to thank the teams behind the databases that RL designer uses, their offical websites can be found at: [Uniport](https://www.uniprot.org/), [HMDD](http://www.cuilab.cn/hmdd), [miRBase](https://www.mirbase.org).


## License
This repository is licensed under the [Apache License 2.0](LICENSE) — a permissive
open-source license recommended for software (Creative Commons licenses are *not*
intended for source code). You are free to use, modify, and distribute this software,
provided you keep the license and attribution notices. If you prefer different terms
for your own tool, you may replace this license, but it must remain an
[OSI-approved open-source license](https://opensource.org/licenses).
