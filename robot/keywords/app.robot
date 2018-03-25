*** Keywords ***
เปิดแอพ
    Open Browser    ${APP_URL}    ${BROWSER}

ปิดแอพ
    Close Browser

จะต้องแสดงหน้าล็อกอิน
    Wait Until Element Is Visible    page-login

จะต้องแสดงหน้าแดชบอร์ด
    Wait Until Element Is Visible    page-dashboard

ล็อกอินด้วย
    [Arguments]    ${username}    ${password}
    Input Text    input-username    ${username}
    Input Password    input-password    ${password}
    Click Element    button-login

จะต้องแสดงข้อผิดพลาด
    [Arguments]    ${message}
    Wait Until Element Is Visible    modal-error
    Element Should Contain    modal-error    ${message}