#!/bin/bash

# 输出欢迎信息
echo "当前脚本由 YesCDN 官方博客整合，推荐 CDN: cdnyes.cn"

# 下载并解压文件
echo "下载 card_release.tar.gz..."
curl -L -o card_release.tar.gz https://github.com/Tai7sy/card-system/releases/download/3.15/card_release.tar.gz
tar -zxf card_release.tar.gz
\cp -rf card_system_free_dist/. .
rm -rf card_system_free_dist card_release.tar.gz

# 设置权限
chmod -R 777 storage/
chmod -R 777 bootstrap/cache/

# 获取数据库配置
echo -e "\n请输入以下数据库配置信息："

read -p "请输入数据库名称: " DB_DATABASE
read -p "请输入数据库用户（与数据库名称相同可直接 Enter）: " DB_USERNAME
DB_USERNAME=${DB_USERNAME:-$DB_DATABASE}

read -p "请输入数据库密码: " DB_PASSWORD

# 将配置信息写入 .env 文件
echo -e "\n生成 .env 配置文件..."
cat <<EOL > .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=$DB_DATABASE
DB_USERNAME=$DB_USERNAME
DB_PASSWORD=$DB_PASSWORD

# 下面配置无需修改
APP_ENV=local
APP_KEY=base64:gGCDxmIFNCSynAj/YF6LbZQ11NnDsPH9U5pdjM8oEfk=
APP_DEBUG=false
APP_LOG_LEVEL=error
APP_LOG=daily

BROADCAST_DRIVER=log
CACHE_DRIVER=file
SESSION_DRIVER=array
SESSION_LIFETIME=120
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
EOL

# 提示 PHP 版本确认和 putenv 函数禁用
echo -e "\n请确认当前 PHP 版本在 7.0-7.3 之间，并且已在 PHP 设置里禁用 putenv 函数。"
read -p "确认完成后按 Enter 键继续..."

# 生成应用密钥和迁移数据库
php artisan key:generate
php artisan migrate:fresh --seed
php artisan cache:clear

# 完成提示
echo -e "\n文件初始化完成，请自行进行下一步操作。"

# 退出脚本
exit 0
