# Use a lightweight Debian-based Node.js image
FROM node:16-bullseye

# Install required libraries for TensorFlow.js and other dependencies
RUN apt-get update && apt-get install -y \
    bash \
    libxext6 \
    libxrender1 \
    libsm6 \
    curl \
    python3 \
    python3-pip \
    build-essential \
    libopenblas-dev \
    gfortran \
    cython3 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir numpy==1.21.6 scipy==1.7.3
RUN pip3 install --no-cache-dir sentence-transformers

# Set a writable directory for the Hugging Face cache
ENV HF_HOME=/tmp/huggingface

# Create the writable directory
RUN mkdir -p /tmp/huggingface && chmod -R 777 /tmp/huggingface


# Set the working directory
WORKDIR /server

# Copy package.json and yarn.lock to leverage Docker caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application source code
COPY . .

# Expose the app port
EXPOSE 8080

# Set the default command to start the app
CMD ["npm", "run", "dev"]
