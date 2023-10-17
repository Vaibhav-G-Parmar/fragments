# in this course, we use dockerfile to create a docker image using docker engine and we use that docker image to create a running docker container
# for lab 5, goal is to learn the syntax of a Dockerfile

#specifies the parent (or base) image to use as a starting point for our own image. 
#Our fragments image will be based on other Docker images, the official node base images
# Use node version 18.17.1
FROM node:18.17.1 
########### if I am using different PC then I need to select the version of node I am using in that pc #########

#The LABEL instruction adds key=value pairs with arbitrary metadata about your image.
LABEL maintainer="Vaibhav Parmar <vgparmar@myseneca.ca>"
LABEL description="Fragments node.js microservice"

# We default to use port 8080 in our service
ENV PORT=8080

# Reduce npm spam when installing within Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#loglevel
ENV NPM_CONFIG_LOGLEVEL=warn

# Disable colour when run inside Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#color
ENV NPM_CONFIG_COLOR=false

# Use /app as app's working directory
WORKDIR /app

# Option 1: explicit path - Copy the package.json and package-lock.json
# files into /app. NOTE: the trailing `/` on `/app/`, which tells Docker
# that `app` is a directory and not a file.
COPY package*.json /app/

# Install node dependencies defined in package-lock.json
RUN npm install

# Copy src to /app/src/
COPY ./src ./src

# Copy our HTPASSWD file
COPY ./tests/.htpasswd ./tests/.htpasswd

# Start the container by running our server
CMD npm start

# We run our service on port 8080
EXPOSE 8080
