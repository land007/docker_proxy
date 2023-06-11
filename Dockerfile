FROM land007/node:latest

MAINTAINER Jia Yiqiu <yiqiujia@hotmail.com>

RUN echo $(date "+%Y-%m-%d_%H:%M:%S") >> /.image_times && \
	echo $(date "+%Y-%m-%d_%H:%M:%S") > /.image_time && \
	echo "land007/proxy" >> /.image_names && \
	echo "land007/proxy" > /.image_name

#RUN . $HOME/.nvm/nvm.sh && cd / && npm install basic-auth
ADD node /node_

ENV username=land007 \
	password=fcea920f7412b5da7be0cf42b8c93759 \
	DOMAIN_NAME=voice.qhkly.com

EXPOSE 8080
EXPOSE 8888

#CMD /check.sh /node && /node/start.sh

#docker build -t land007/proxy:latest .
#docker run -it --restart=always -e "username=land007" -e "password=fcea920f7412b5da7be0cf42b8c93759" -p 8080:8080 -p 8888:8888 --name proxy land007/proxy:latest
#> docker buildx build --platform linux/amd64,linux/arm64/v8,linux/arm/v7 -t land007/proxy:latest --push .
# export http_proxy=http://land007:1234567@127.0.0.1:28080
# export https_proxy=http://land007:1234567@127.0.0.1:28080
#curl http://www.ce.cn
#curl https://www.baidu.com
#curl -x http://land007:1234567@127.0.0.1:28080 http://www.ce.cn
# export HTTP_PROXY=http://land007:1234567@192.168.3.40:38080
# export HTTPS_PROXY=http://land007:1234567@192.168.3.40:38080
#curl http://www.ce.cn
