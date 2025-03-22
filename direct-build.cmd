@echo off
echo Starting Next.js build with direct cmd execution...

:: Find the next.cmd file (Windows-specific executable)
set NEXT_CMD="%CD%\node_modules\.bin\next.cmd"

:: Check if the file exists
if exist %NEXT_CMD% (
  echo Found next.cmd at %NEXT_CMD%
  call %NEXT_CMD% build
) else (
  echo next.cmd not found. Checking alternative locations...
  
  :: Try an alternative path
  set NEXT_CMD="%CD%\node_modules\next\dist\bin\next.cmd"
  if exist %NEXT_CMD% (
    echo Found alternative next.cmd at %NEXT_CMD%
    call %NEXT_CMD% build
  ) else (
    echo ERROR: Could not find next.cmd in expected locations.
    exit /b 1
  )
)

if %ERRORLEVEL% NEQ 0 (
  echo Build failed with error code %ERRORLEVEL%
  exit /b %ERRORLEVEL%
)

echo Build completed successfully