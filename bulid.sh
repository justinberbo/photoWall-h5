# 解压成war包
jar -cvfM0 ./
# 复制到tomcat目录
cp -f photoWall.war  /usr/local/apache-tomcat-9.0.37/webapps
#删除jenkin目录
#rm -rf photoWall-h5/