import os

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

live_stats_patch = """
/* ━━━━ HOME ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildHome(user) {
  const cfg = ROLE_HOME[user.role];
  const greeting = getGreeting();
  const dateStr = getFormattedDate();
  const firstName = user.name.split(' ')[0];

  let calculatedStats = cfg.stats;
  if (user.role === 'vice_principal') {
    const totalIssues = GLOBAL_ISSUES.filter(i => i.status !== 'Resolved' && i.status !== 'Closed').length;
    const escalated = GLOBAL_ISSUES.filter(i => i.stage === 'VP' && i.status !== 'Resolved' && i.status !== 'Closed').length;
    
    calculatedStats = [
      { label: "Active Escalations", value: escalated.toString(), icon: "🚨" },
      { label: "Total Open Issues", value: totalIssues.toString(), icon: "📋" },
      { label: "Low Att. Alerts", value: "3", icon: "⚠️" },
      { label: "Pending Approvals", value: "5", icon: "⏱️" }
    ];
  }

  // Welcome Banner
"""

if "let calculatedStats = cfg.stats;" not in content:
    content = content.replace(
        "/* ━━━━ HOME ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */\nfunction buildHome(user) {\n  const cfg = ROLE_HOME[user.role];\n  const greeting = getGreeting();\n  const dateStr = getFormattedDate();\n  const firstName = user.name.split(' ')[0];\n\n  // Welcome Banner",
        live_stats_patch
    )
    content = content.replace(
        "const stats = cfg.stats.map(s => `",
        "const stats = calculatedStats.map(s => `"
    )
    with open(dash_path, "w", encoding="utf-8") as f:
        f.write(content)
