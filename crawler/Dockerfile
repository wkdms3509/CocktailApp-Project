# FROM ubuntu:latest
FROM seleniarm/standalone-chromium:latest
# FROM seleniarm/standalone-chromium:latest

USER root

# RUN apt-get update && apt-get install -y nodejs npm
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /crawler
# RUN apt-get -y update
# RUN apt install wget
# RUN apt install unzip
# # RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# # RUN apt -y install ./google-chrome-stable_current_amd64.deb
# RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
# RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/ \
#     && rm /tmp/chromedriver.zip


COPY . .

RUN npm ci

USER seluser

# CMD [ "node", "main.js", "--seleniumAddress=http://chrome:4444/wd/hub" ]

EXPOSE 4444

# CMD [ "node", "main.js" ]