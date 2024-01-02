FROM nginx:alpine

COPY /dist /usr/share/nginx/html
RUN touch var/run/nginx.pid
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx var/run/nginx.pid


EXPOSE 80
USER nginx

CMD ["nginx", "-g", "daemon off;"]