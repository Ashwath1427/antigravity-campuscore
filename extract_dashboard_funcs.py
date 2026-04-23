import re
import traceback

try:
    with open('js/dashboard.js', 'r', encoding='utf-8') as f:
        text = f.read()

    funcs_to_extract = [
        'buildVPAttendance',
        'buildProfile',
        'buildSettings',
        'buildEvents',
        'buildVPClassPerf',
        'buildVPTeachers',
        'buildVPExams',
        'buildVPReports',
        'buildVPApprovals'
    ]

    with open('dashboard_funcs.txt', 'w', encoding='utf-8') as f_out:
        for func_name in funcs_to_extract:
            start_index = text.find('function ' + func_name)
            if start_index != -1:
                # Find the next function to determine the end of this one
                end_index = text.find('function ', start_index + 10)
                if end_index == -1:
                    end_index = len(text)
                func_text = text[start_index:end_index]
                f_out.write(f'=== BEGIN {func_name} ===\n')
                f_out.write(func_text)
                f_out.write(f'\n=== END {func_name} ===\n\n')
            else:
                f_out.write(f'--- {func_name} NOT FOUND ---\n\n')

    print("Functions extracted successfully to dashboard_funcs.txt")
except Exception as e:
    print(f"Error extracting functions: {e}")
    traceback.print_exc()
