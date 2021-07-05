@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

echo -^> sign vendor-curl

pushd temp\curl\bin
for /r %%i in (*.dll) do call grigore-stefan.sign "curl" "%%i"
for /r %%i in (*.exe) do call grigore-stefan.sign "curl" "%%i"
popd
