# in this course, we use dockerfile to create a docker image using docker engine and we use that docker image to create a running docker container
# for lab 5, goal is to learn the syntax of a Dockerfile

##################################################################################################
# Stage 0: install the base dependencies 

#specifies the parent (or base) image to use as a starting point for our own image. 
#Our fragments image will be based on other Docker images, the official node base images
# Use node version 18.17.1 - locking it by using sha for the LTS alpine version
FROM node:20.9-alpine@sha256:eb881c02f0721b4562e0004295db6447bf0727c1 AS dependencies
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

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Use /app as app's working directory
WORKDIR /app

# Option 1: explicit path - Copy the package.json and package-lock.json
# files into /app. NOTE: the trailing `/` on `/app/`, which tells Docker
# that `app` is a directory and not a file.
COPY package*.json /app/

# Install node dependencies defined in package-lock.json
RUN npm ci --only=production

##################################################################################################
# Stage 1: build and deploy the app  
FROM node:20.9-alpine@sha256:eb881c02f0721b4562e0004295db6447bf0727c1 AS deploy

WORKDIR /app

COPY --from=dependencies /app /app

# Copy src to /app/src/
COPY ./src ./src

# Copy our HTPASSWD file
COPY ./tests/.htpasswd ./tests/.htpasswd

# Start the container by running our server
CMD ["npm", "start"]
# CMD ["node", "src/index.js"] <- this can be run as well
# Avoiding using npm inside the Dockerfile and using node since npm has to start multiple processes and we want to avoid that

# We run our service on port 8080
EXPOSE 8080

#healthcheck of the container (keep checking every time you run the docker instance, whether it is returning 200 ok or not, is it healthy route \
# or not keep checking every time you run the docker instance, whether it is returning 200 ok or not, is it healthy route or not)
HEALTHCHECK --interval=15s --timeout=30s --start-period=10s --retries=3 \
  CMD curl --fail localhost || exit 1
  
##################################################################################################
