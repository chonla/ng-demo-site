*** Keywords ***
Input Wysiwyg Text
    [Arguments]    ${locator}    ${text}
    Execute Javascript
    ...    (function() {
    ...        $('#${locator} .ql-editor').html('${text}');
    ...    })();
