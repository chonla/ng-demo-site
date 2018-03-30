*** Keywords ***
เปิดแอพ
    Open Browser    ${APP_URL}    ${BROWSER}

ปิดแอพ
    Close All Browsers

ไปหน้าล็อกอิน
    Go To    ${APP_BASE_URL}/#/login

คลิกเมนูบทความ
    Click Element    menu-post

คลิกปุ่มเผยแพร่บทความ
    Click Element    button-publish-new-post

จะต้องแสดงหน้าล็อกอิน
    Wait Until Element Is Visible    page-login

จะต้องแสดงหน้าแดชบอร์ด
    Wait Until Element Is Visible    page-dashboard

จะต้องแสดงหน้าจอสร้างล็อกอินใหม่
    Wait Until Element Is Visible    modal-registration

จะต้องไม่แสดงหน้าจอสร้างล็อกอินใหม่
    Wait Until Element Is Not Visible    modal-registration

ล็อกอินด้วย
    [Arguments]    ${username}    ${password}
    Input Text    input-username    ${username}
    Input Password    input-password    ${password}
    Click Element    button-login

จะต้องแสดงข้อผิดพลาด
    [Arguments]    ${message}
    Wait Until Element Is Visible    modal-error
    Element Should Contain    modal-error    ${message}

จะต้องแสดงข้อความผลลัพธ์
    [Arguments]    ${message}
    Wait Until Element Is Visible    modal-success
    Element Should Contain    modal-success    ${message}

คลิกปุ่มสร้างล็อกอินใหม่
    Click Element    button-register

กรอก username ใหม่ด้วย
    [Arguments]    ${username}
    Input Text    input-new-username    ${username}

กรอก password ใหม่ด้วย
    [Arguments]    ${password}
    Input Password    input-new-password    ${password}

ยืนยัน password ใหม่ด้วย
    [Arguments]    ${password}
    Input Password    input-confirm-password    ${password}

กดปุ่มสร้างล็อกอิน
    Click Element    button-confirm-create-user

ปิดหน้าจอสร้างล็อกอิน
    Wait Until Element Is Visible    button-x-cancel-create-user
    Click Element    button-x-cancel-create-user
    Wait Until Element Is Not Visible    modal-registration

รอจนกว่าสร้างล็อกอินสำเร็จ
    Wait Until Element Is Visible    modal-success
    Wait Until Element Is Not Visible    modal-loading

รอจนกว่าจะล็อกอินเสร็จ
    Wait Until Element Is Visible    page-dashboard

ล็อกเอาท์
    Click Element    menu-logout

ลบล็อกอิน
    [Arguments]    ${username}    ${password}
    ไปหน้าล็อกอิน
    ล็อกอินด้วย    ${username}    ${password}
    รอจนกว่าจะล็อกอินเสร็จ
    Click Element    menu-leave
    Click Element    button-confirm-leave
    จะต้องแสดงหน้าล็อกอิน
