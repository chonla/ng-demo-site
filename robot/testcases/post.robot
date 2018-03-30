*** Settings ***
Resource    ../settings/all.robot
Suite Setup    ล็อกอินแล้วไปหน้าสร้างบทความ
Suite Teardown    ปิดแอพ

*** Variables ***
${NEW_POST_TITLE}    บทความใหม่จากระบบทดสอบอัตโนมัติ
${NEW_POST_SLUG}    new-post-from-automated-test
${NEW_POST_BODY}    เนื้อหาทดสอบบทความอัตโนมัติ

*** Test Cases ***
สร้างบทความใหม่
    ใส่ชื่อบทความใหม่เป็น    ${NEW_POST_TITLE}
    ใส่ลิงก์มายังบทความเป็น    ${NEW_POST_SLUG}
    ใส่เนื้อหาในบทความเป็น    ${NEW_POST_BODY}
    คลิกปุ่มเผยแพร่บทความ

*** Keywords ***
ล็อกอินแล้วไปหน้าสร้างบทความ
    เปิดแอพ
    ล็อกอินด้วย    ${VALID_USERNAME}    ${VALID_PASSWORD}
    รอจนกว่าจะล็อกอินเสร็จ
    คลิกเมนูบทความ
    คลิกปุ่มสร้างบทความใหม่

คลิกปุ่มสร้างบทความใหม่
    Click Element    button-create-post

ใส่ชื่อบทความใหม่เป็น
    [Arguments]    ${title}
    Input Text    new-post-title    ${title}

ใส่ลิงก์มายังบทความเป็น
    [Arguments]    ${slug}
    Input Text    new-post-slug    ${slug}

ใส่เนื้อหาในบทความเป็น
    [Arguments]    ${body}
    Input Wysiwyg Text    new-post-body    ${body}
