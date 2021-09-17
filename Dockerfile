FROM nginx
# # RUN echo '这是一个本地构建的nginx镜像' > /usr/share/nginx/html/index.html
# COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html1