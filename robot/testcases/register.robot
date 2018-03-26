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
