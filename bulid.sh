# 解压成war包
jar -cvfM0 photoWall.war ./
# 复制到tomcat目录
cp -f photoWall.war  /usr/local/apache-tomcat-9.0.37/webapps