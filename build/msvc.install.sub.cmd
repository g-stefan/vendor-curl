@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

rem --- make

cmd.exe /C build\msvc.make.cmd
if errorlevel 1 exit 1

rem ---

if not exist "%INSTALL_PATH_BIN%\" mkdir "%INSTALL_PATH_BIN%"
xcopy /Y /S /E "temp\curl\bin\*.exe" "%INSTALL_PATH_BIN%\"
xcopy /Y /S /E "temp\curl\bin\*.dll" "%INSTALL_PATH_BIN%\"

rem --- dev

if not exist "%INSTALL_PATH_DEV%\" mkdir "%INSTALL_PATH_DEV%"
if not exist "%INSTALL_PATH_DEV%\bin" mkdir "%INSTALL_PATH_DEV%\bin"
if not exist "%INSTALL_PATH_DEV%\include" mkdir "%INSTALL_PATH_DEV%\include"
if not exist "%INSTALL_PATH_DEV%\lib" mkdir "%INSTALL_PATH_DEV%\lib"
xcopy /Y /S /E "temp\curl\bin\*.exe" "%INSTALL_PATH_DEV%\bin\"
xcopy /Y /S /E "temp\curl\bin\*.dll" "%INSTALL_PATH_DEV%\bin\"
xcopy /Y /S /E "temp\curl\include\" "%INSTALL_PATH_DEV%\include\"
copy /Y /B "temp\curl\lib\*.lib" "%INSTALL_PATH_DEV%\lib\*"
copy /Y /B "temp\curl\lib\libcurl_imp.lib" "%INSTALL_PATH_DEV%\lib\libcurl.lib"
