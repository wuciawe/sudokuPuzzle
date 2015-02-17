name := "SimplePlay"

version := "1.0"

scalaVersion := "2.11.4"

lazy val `simpleplay` = (project in file(".")).enablePlugins(PlayScala)

libraryDependencies ++= Seq( jdbc , anorm , cache , ws )

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  