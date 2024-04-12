# 使用 Node 作为基础镜像
FROM node:20 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件并安装依赖
COPY package*.json ./
RUN npm install


# 复制项目文件到工作目录
COPY . .

# 执行构建命令
RUN npm run build

# 使用 Nginx 作为基础镜像
FROM nginx:alpine

# 将构建后的 Vue.js 项目复制到 Nginx 默认的静态文件目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf


# 暴露 Nginx 默认端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]