# 解压成war包
jar -cvfM0 photoWall.war ./photoWall-h5/
# 复制到tomcat目录
cp -f ./photoWall-h5/photoWall.war  /usr/local/apache-tomcat-9.0.37/webapps
#删除jenkin目录
#rm -rf photoWall-h5/