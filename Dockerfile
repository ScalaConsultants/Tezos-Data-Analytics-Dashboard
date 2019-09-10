FROM ubuntu:18.04 as builder
WORKDIR /app
COPY . .
RUN apt-get update -yq
RUN apt-get install nodejs npm git libusb-1.0-0-dev libudev-dev -yq
RUN npm install yarn -g
RUN yarn install
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
