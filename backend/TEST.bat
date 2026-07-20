@echo off
set PATH=C:\Program Files\Apache\apache-maven-3.9.16\bin;%PATH%
cd /d "c:\Users\Dell\Desktop\BGMI_Startup\backend"
echo Testing Maven...
mvn --version
echo.
echo Testing Java...
java -version
echo.
echo Test complete!
