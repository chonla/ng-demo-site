*** Keywords ***
เปิดแอพ
    Open Browser    ${APP_URL}    ${BROWSER}

ปิดแอพ
    Close All Browsers

จะต้องแสดงหน้าล็อกอิน
    Wait Until Element Is Visible    page-login

จะต้องแสดงหน้าแดชบอร์ด
    Wait Until Element Is Visible    page-dashboard

จะต้องแสดงหน้าจอสร้างล็อกอินใหม่
    Wait Until Element Is Visible    modal-registration

ล็อกอินด้วย
    [Arguments]    ${username}    ${password}
    Input Text    input-username    ${username}
    Input Password    input-password    ${password}
    Click Element    button-login

จะต้องแสดงข้อผิดพลาด
    [Arguments]    ${message}
    Wait Until Element Is Visible    modal-error
    Element Should Contain    modal-error    ${message}

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
