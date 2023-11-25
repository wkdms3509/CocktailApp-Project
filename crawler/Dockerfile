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

# CMD [ "node", "main.js"]

EXPOSE 4444

# CMD [ "node", "main.js" ]

# Use the Python base image 
# FROM python:3.9 
# # Install necessary packages 
# RUN apt-get update -y && apt-get install -yq \ 
# wget \ 
# gnupg2 \ 
# libnss3 \ 
# libgconf-2-4 \ 
# libfontconfig1 \ 
# libasound2 
# # Install Chrome 
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list 
# RUN apt-get update -y 
# RUN apt-get install -y google-chrome-stable 
# # Set up the working directory 
# WORKDIR /app 
# # Copy your Selenium test scripts or web scraping scripts to the container 
# COPY . /app 
# # Install Python dependencies 
# RUN pip install -r requirements.txt 
# # Set an environment variable to run headless (optional but useful for containerized environments) 
# ENV HEADLESS=1 
# # Run your Selenium tests or web scraping scripts 
# CMD ["python", "your_selenium_script.py"]