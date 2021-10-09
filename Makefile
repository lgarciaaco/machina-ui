export PROJECT = lgarciaac
export VERSION = 1.0
export ENVIRONMENT = development

build-client:
	docker build \
		-f dockerfiles/dockerfile.client \
		-t $(PROJECT)/machina-client:${VERSION} \
		--build-arg PACKAGE_NAME=client \
		--build-arg VCS_REF=`git rev-parse HEAD` \
		--build-arg BUILD_DATE=`date -u +”%Y-%m-%dT%H:%M:%SZ”` \
		.

build-client-arm:
	docker build \
		-f dockerfiles/dockerfile.client.arm64 \
		-t $(PROJECT)/machina-client:${VERSION}-arm64 \
		--build-arg PACKAGE_NAME=client \
		--build-arg VCS_REF=`git rev-parse HEAD` \
		--build-arg BUILD_DATE=`date -u +”%Y-%m-%dT%H:%M:%SZ”` \
		.

push-client:
	docker --config="${DOCKER_CONFIG}" push $(PROJECT)/machina-client:${VERSION}

push-client-arm:
	docker --config="${DOCKER_CONFIG}" push $(PROJECT)/machina-client:${VERSION}-arm64

build: build-client build-client-arm
push: push-client push-client-arm