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
    Click Element    button-cancel-create-user

รอจนกว่าสร้างล็อกอินสำเร็จ
    Wait Until Element Is Visible    modal-success
    Wait Until Element Is Not Visible    modal-loading
    Sleep    0.5s

ล้างล็อกอิน
    Send Request To    http://api:195376cebcd1e0517d0067b2354555a7@jenkins.m150.me/job/sweet-singer-remove-user/build?token=TESTTEARDOWN
