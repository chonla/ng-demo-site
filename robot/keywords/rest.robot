*** Keywords ***
Send Request To
    [Arguments]    ${endpoint}
    ${resp}=    Get    ${endpoint}
    [Return]    ${resp}

Response Should Be Success
    [Arguments]    ${resp}
    Response HTTP Status Code Should Be    ${resp}    ${200}

Response HTTP Status Code Should Be
    [Arguments]    ${resp}    ${code}
    Should Be Equal As Numbers    ${code}    ${resp.status_code}

Response Should Be Json
    [Arguments]    ${resp}
    Response Type Should Be    ${resp}    application/json

Response Type Should Be
    [Arguments]    ${resp}    ${mimetype}
    ${content_type_headers}=    Set Variable    ${resp.headers['content-type']}
    ${content_type}    ${encoding}=    Split String    ${content_type_headers}    ;${SPACE}
    Should Be Equal As Strings    ${mimetype}    ${content_type}

Response Should Contain Key
    [Arguments]    ${resp}    ${key}
    ${json}=    Set Variable    ${resp.json()}
    Dictionary Should Contain Key    ${json}    ${key}
