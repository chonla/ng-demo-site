*** Settings ***
Resource    ../settings/all.robot
Suite Setup    ล็อกอินแล้วไปหน้าบทความ
Suite Teardown    ปิดแอพ

*** Variables ***
${NEW_POST_TITLE}    บทความใหม่จากระบบทดสอบอัตโนมัติ
${NEW_POST_SLUG}    new-post-from-automated-test
${NEW_POST_BODY}    เนื้อหาทดสอบบทความอัตโนมัติ

*** Test Cases ***
คลิกเมนูบทความแล้วจะต้องไปหน้าบทความ
    จะต้องแสดงหน้าบทความ

สร้างบทความใหม่แล้วจะต้องมีบทความใหม่แสดงอยู่ในหน้ารายการบทความ
    คลิกปุ่มสร้างบทความใหม่
    ใส่ชื่อบทความใหม่เป็น    ${NEW_POST_TITLE}
    ใส่ลิงก์มายังบทความเป็น    ${NEW_POST_SLUG}
    ใส่เนื้อหาในบทความเป็น    ${NEW_POST_BODY}
    คลิกปุ่มเผยแพร่บทความ
    รอจนกว่าจะบันทึกบทความเสร็จ
    จะต้องแสดงข้อความผลลัพธ์    บทความใหม่ของคุณถูกบันทึกไว้เรียบร้อยแล้ว
    คลิกเมนูบทความ
    จะต้องมีบทความใหม่แสดง    ${NEW_POST_TITLE}
    [Teardown]    ลบบทความ    ${NEW_POST_TITLE}

*** Keywords ***
ล็อกอินแล้วไปหน้าบทความ
    เปิดแอพ
    ล็อกอินด้วย    ${VALID_USERNAME}    ${VALID_PASSWORD}
    รอจนกว่าจะล็อกอินเสร็จ
    คลิกเมนูบทความ

คลิกปุ่มสร้างบทความใหม่
    Click Element    button-create-post

ใส่ชื่อบทความใหม่เป็น
    [Arguments]    ${title}
    Input Text    input-new-post-title    ${title}

ใส่ลิงก์มายังบทความเป็น
    [Arguments]    ${slug}
    Input Text    input-new-post-slug    ${slug}

ใส่เนื้อหาในบทความเป็น
    [Arguments]    ${body}
    Input Wysiwyg Text    wgsiwyg-new-post-body    ${body}

จะต้องมีบทความใหม่แสดง
    [Arguments]    ${title}
    รอจนกว่าจะแสดงรายชื่อบทความเสร็จ
    Web Element Should Exactly Contain    css:.post-title    ${title}

รอจนกว่าจะแสดงรายชื่อบทความเสร็จ
    Wait Until Page Contains Element    css:.post-title

ลบบทความ
    [Arguments]    ${title}
    ${index}=    Find Element Index Containing Exact Text    css:.post-title    ${title}
    Mouse Over    css:#posts-list tbody tr:nth-child(${index + 1})
    Click Element    css:.menu-remove-post
    Click Element    button-confirm-modal-ok
