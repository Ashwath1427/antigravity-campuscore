dash = open('js/dashboard.js', encoding='utf-8').read()
app = open('js/app.js', encoding='utf-8').read()
ui = open('js/ui.js', encoding='utf-8').read()

print(1, 'loadTheme()' in app)
print(2, 'campuscore_settings' in ui)
print(3, 'FileReader' in dash)
print(4, 'triggerLiveReRender()' in dash)
print(5, 'escalateIssue' in dash and 'triggerLiveReRender' in dash)
