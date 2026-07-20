@echo off
REM Diagnostic script to find Java and Maven - Updated Version

setlocal enabledelayedexpansion

echo.
echo =====================================================
echo   System Diagnostic - Java and Maven Check
echo =====================================================
echo.

REM Check Maven
echo [CHECK 1] Looking for Maven...
if exist "C:\Program Files\Apache\apache-maven-3.9.16\bin\mvn.cmd" (
    echo [FOUND] Maven at: C:\Program Files\Apache\apache-maven-3.9.16
    echo [TEST] Running: mvn --version
    "C:\Program Files\Apache\apache-maven-3.9.16\bin\mvn.cmd" --version
    echo [STATUS] Maven command returned code: !ERRORLEVEL!
) else (
    echo [NOT FOUND] Maven not at C:\Program Files\apache-maven-3.9.16
)

echo.
echo [CHECK 2] Looking for Java 21...
if exist "C:\Program Files\Java\jdk-21\bin\java.exe" (
    echo [FOUND] Java 21 at: C:\Program Files\Java\jdk-21
    echo [TEST] Running: java -version
    "C:\Program Files\Java\jdk-21\bin\java.exe" -version 2>&1
    echo [STATUS] Java returned code: !ERRORLEVEL!
) else (
    echo [NOT FOUND] Java 21 not at expected location
    echo [SEARCH] Searching for any Java installation...
    for /d %%D in (C:\Program Files\Java\*) do (
        if exist "%%D\bin\java.exe" (
            echo [FOUND] Java at: %%D
            echo [TEST] Running java version...
            "%%D\bin\java.exe" -version 2>&1
        )
    )
)

echo.
echo [CHECK 3] Checking PATH variable...
echo [PATH] %PATH%

echo.
echo [CHECK 4] Testing from backend directory...
cd /d "c:\Users\Dell\Desktop\BGMI_Startup\backend"
echo [DIR] Current: %cd%
echo [TEST] Running: mvn --version
call mvn --version

echo.
echo =====================================================
echo   Diagnostic Complete
echo =====================================================
echo.
pause
