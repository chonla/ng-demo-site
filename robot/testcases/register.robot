*** Settings ***
Resource    ../settings/all.robot
Resource    ../keywords/app.robot
Resource    ../variables/global.robot
Test Setup    เปิดแอพ
Test Teardown    ปิดแอพ

*** Test Cases ***
เปิดหน้าสร้างล็อกอินใหม่
    คลิกปุ่มสร้างล็อกอินใหม่
    จะต้องแสดงหน้าจอสร้างล็อกอินใหม่

ยกเลิกการสร้างล็อกอิน
    คลิกปุ่มสร้างล็อกอินใหม่
    ปิดหน้าจอสร้างล็อกอิน

สร้างล็อกอินใหม่
    เปิดแอพ
    คลิกปุ่มสร้างล็อกอินใหม่
    กรอก username ใหม่ด้วย    ${NEW_USERNAME}
    กรอก password ใหม่ด้วย    ${NEW_PASSWORD}
    ยืนยัน password ใหม่ด้วย    ${NEW_PASSWORD}
    กดปุ่มสร้างล็อกอิน
    จะต้องแสดงข้อความผลลัพธ์    คุณสามารถใช้ล็อกอินนี้เพื่อเข้าสู่ระบบได้เลย
