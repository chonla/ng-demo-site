*** Keywords ***
Web Element Should Exactly Contain
    [Arguments]    ${locator}    ${text}
    ${index}=    Find Element Index Containing Exact Text    ${locator}    ${text}
    Should Be True    ${index} >= 0

Find Element Index Containing Exact Text
    [Arguments]    ${locator}    ${text}
    ${index}=    Set Variable    ${0}
    ${elements}=    Get WebElements    ${locator}
    :FOR    ${element}    IN    @{elements}
    \    ${element_text}=    Get Text    ${element}
    \    Run Keyword If    '${element_text}' == '${text}'    Return From Keyword    ${index}
    \    ${index}=    Set Variable    ${index + 1}
    [Return]    ${-1}
