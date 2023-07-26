1、目录结构
    dbs 数据库备份
    www 前端代码
    server 后端代码

2、如何使用
    前端： 使用nginx启动前端应用,配置项/nginx.conf 提供了示例，自行修改项目所在目录即可
    后端： 使用配置项/maven-settings.xml 中的配置覆盖本地maven配置，修改 servers、profiles、activeProfiles项目，因依赖包部署在阿里云私仓，所以必须修改配置
    数据库： server/data-server/src/main/resources/dbconfig.properties 、 server/data-server/src/main/resources/applicationContext-first.properties

    后端启动 server/data-server/start.bat 
    构建平台运行： 配置项/build.exe，直接运行即可，访问地址： localhost:81 , 暂只支持调用服务器为http://localhost:90的服务（后端启动的服务）