@echo off
cd /d "c:\Users\Dell\Desktop\BGMI_Startup\backend"
echo Starting Maven Spring Boot Application...
echo. >> build.log
echo ========== BUILD LOG ========== >> build.log
date /t >> build.log
time /t >> build.log
echo. >> build.log

mvn spring-boot:run >> build.log 2>&1

echo Build finished. Check build.log for details.
type build.log
pause
