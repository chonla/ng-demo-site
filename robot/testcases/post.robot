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
    จะต้องแสดงข้อความผลลัพธ์    บทความใหม่ของคุณถูกบันทึกไว้เรียบร้อยแล้ว
    ไปหน้าบทความ
    จะต้องมีบทความใหม่แสดง    ${NEW_POST_TITLE}

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
    Input Text    input-new-post-title    ${title}

ใส่ลิงก์มายังบทความเป็น
    [Arguments]    ${slug}
    Input Text    input-new-post-slug    ${slug}

ใส่เนื้อหาในบทความเป็น
    [Arguments]    ${body}
    Input Wysiwyg Text    wgsiwyg-new-post-body    ${body}

จะต้องมีบทความใหม่แสดง
    [Arguments]    ${title}
    Table Column Should Contain    posts-list    2    ${title}

Table Column Should Contain
    [Arguments]    ${locator}    ${column_index}    ${text}
    Execute Javascript
    ...    (function() {
    ...        var column = $('#${locator} tbody tr td:nth-child(${column_index})');
    ...        for (var i = 0; i < column.length; i++) {
    ...            if (column[i].text().indexOf('${text}') >= 0) {
    ...                return true;
    ...            }
    ...        }
    ...        return false;
    ...    })();
