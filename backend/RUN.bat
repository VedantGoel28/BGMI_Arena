@echo off
REM BGMI Platform Backend - Simple Startup Script

echo.
echo =====================================================
echo    BGMI Platform Backend - Startup
echo =====================================================
echo.

REM Set paths
set MAVEN_HOME=C:\Program Files\Apache\apache-maven-3.9.16
set JAVA_HOME=C:\Program Files\Java\jdk-21.0.11

REM Navigate to backend
cd /d "c:\Users\Dell\Desktop\BGMI_Startup\backend"

echo [INFO] Starting Maven build and Spring Boot...
echo [INFO] MongoDB: localhost:27017/bgmi_platform
echo [INFO] Backend will run on: http://localhost:8080/api/health
echo.

REM Run Maven
"%MAVEN_HOME%\bin\mvn.cmd" clean package -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Build complete! Starting backend...
echo [INFO] Press Ctrl+C to stop
echo.

REM Run JAR
"%JAVA_HOME%\bin\java.exe" -jar target\bgmi-platform-0.0.1-SNAPSHOT.jar

pause
