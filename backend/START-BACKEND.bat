@echo off
REM BGMI Platform Backend Startup Script
REM Automatically finds and runs Maven with Spring Boot

setlocal enabledelayedexpansion

echo.
echo =====================================================
echo    BGMI Platform Backend - Startup Script
echo =====================================================
echo.

REM Explicitly set Java Home
set JAVA_HOME=C:\Program Files\Java\jdk-21
if not exist "%JAVA_HOME%" (
    for /d %%D in (C:\Program Files\Java\*) do (
        if exist "%%D\bin\java.exe" (
            set JAVA_HOME=%%D
            goto found_java
        )
    )
    echo [ERROR] Java not found!
    echo [INFO] Please install Java 21 from https://www.oracle.com/java/technologies/downloads/
    pause
    exit /b 1
    
    :found_java
)

REM Set Maven Home
set MAVEN_HOME=C:\Program Files\Apache\apache-maven-3.9.16
set M2_HOME=%MAVEN_HOME%

REM Add to PATH
set PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%

echo [INFO] Java: %JAVA_HOME%\bin\java.exe
echo [INFO] Maven: %MAVEN_HOME%\bin\mvn.cmd
echo.

REM Test Java
echo [CHECK] Testing Java...
"%JAVA_HOME%\bin\java.exe" -version 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java test failed!
    pause
    exit /b 1
)

echo.
REM Navigate to backend
cd /d "c:\Users\Dell\Desktop\BGMI_Startup\backend"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Cannot change to backend directory!
    pause
    exit /b 1
)

echo [INFO] Current directory: %cd%
echo [INFO] MongoDB should be running on: localhost:27017
echo.

REM First build
echo [BUILD] Starting Maven clean package...
echo [INFO] First run may take 2-5 minutes to download dependencies...
echo.

call "%MAVEN_HOME%\bin\mvn.cmd" clean package -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo [SUCCESS] Build completed!
echo.

REM Run the JAR
echo [RUN] Starting Spring Boot Application...
echo [INFO] Backend will be available at: http://localhost:8080/api/health
echo [INFO] Press Ctrl+C to stop the server
echo.

"%JAVA_HOME%\bin\java.exe" -jar target\bgmi-platform-0.0.1-SNAPSHOT.jar

pause
