# node 版本號(依開發時所使用的環境選擇為 18 、並加上 alpine 為穩定版)
FROM node:18-alpine as builder
# 建立工作目錄(小寫)
WORKDIR /webyserp
# 添加所有檔案到工作目錄中
ADD . /webyserp
# RUN npm install && npm run build && npm install -g http-server(用 ci 替代 npm install)
RUN npm ci && npm run build
# PORT(這裡只是給發布的人知道自己原本的 PORT 接口)
EXPOSE 3000
# CMD http-server ./build -p 3000容器啟動後、執行http-server(用 nginx 取代)
FROM nginx:alpine
COPY --from=builder /webyserp/build /usr/share/nginx/html