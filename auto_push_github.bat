@echo off
cd /d C:\WEB-RU
git pull origin main
git add .
git commit -m "Auto update %date% %time%"
git push -u origin main
