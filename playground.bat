xcopy js\*.d.ts playground\src\. /q /y
xcopy js\*.js playground\web\js\. /y

rem blijs
xcopy ..\halib\web\libjs\*.js playground\web\js\. /y

rem halib
xcopy ..\blijs\libjsprod\*.js playground\web\js\. /y

pause