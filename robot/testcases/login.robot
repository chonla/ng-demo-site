*** Settings ***
Resource    ../settings/all.robot
Resource    ../keywords/app.robot
Resource    ../variables/global.robot
Test Setup    เปิดแอพ
Test Teardown    ปิดแอพ

*** Test Cases ***
ยังไม่ได้ล็อกอินแล้วเข้ามาที่แอพ
    จะต้องแสดงหน้าล็อกอิน

ล็อกอินด้วย username/password ที่มีอยู่ในระบบ
    ล็อกอินด้วย    ${VALID_USERNAME}    ${VALID_PASSWORD}
    จะต้องแสดงหน้าแดชบอร์ด

ล็อกอินด้วย username ที่มีอยู่ในระบบ แต่รหัสผ่านไม่ถูกต้อง
    ล็อกอินด้วย    ${VALID_USERNAME}    ${INVALID_PASSWORD}
    จะต้องแสดงข้อผิดพลาด    ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
