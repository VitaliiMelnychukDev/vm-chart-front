container_name=vm-charts

build-dev:
	docker-compose build --no-cache vm-charts-local
start:
	docker-compose up -d vm-charts-local
build-prod:
	docker-compose build --no-cache vm-charts-prod
start-prod:
	docker-compose up -d vm-charts-prod
stop:
	docker-compose down
logs:
	docker logs --follow $(container_name)
ssh:
	docker exec -it $(container_name) /bin/sh
info:
	docker inspect $(container_name)
info-ip:
	docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(container_name)
list:
	docker container ls