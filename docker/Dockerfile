FROM node:10-alpine

WORKDIR /usr/src

# Install neccessary packages for rebuilding NPM modules, then uninstall them to keep the image tiny.
RUN apk add --update --virtual .dev-dep git openssh build-base ca-certificates python perl openssh-client gnupg netcat-openbsd && \
	rm -rf /var/lib/apk/lists/* && \
	rm /var/cache/apk/* && \
	yarn global add tiny-cdn  && yarn cache clean && \
	apk del .dev-dep

RUN mkdir -m 777 -p /usr/tmp

COPY build .

CMD ["tiny-cdn", "run", "-e", "-c", "-p=80", "-s=./", "-d=/usr/tmp"]
