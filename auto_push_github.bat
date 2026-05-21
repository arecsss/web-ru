@echo off
cd /d C:\WEB-RU
git add .
git commit -m "Auto update %date% %time%"
git push
end
