$tables = @('cc_approvals','cc_issues','cc_students','cc_attendance','cc_results','cc_users','cc_schedule','cc_exams','cc_reports','cc_announcements','cc_events','cc_messages','cc_helpdesk')
foreach ($t in $tables) {
  $url = "https://bzqqgurlqunpzgdavedz.supabase.co/rest/v1/$t?limit=1"
  try {
    $res = Invoke-RestMethod -Uri $url -Headers @{'apikey'='sb_publishable_c4FB7TUyjfrO-_g4WwV0wQ_7ALx5e27'; 'Authorization'='Bearer sb_publishable_c4FB7TUyjfrO-_g4WwV0wQ_7ALx5e27'}
    Write-Host "FOUND: $t"
  } catch {
    Write-Host "MISSING: $t"
  }
}
