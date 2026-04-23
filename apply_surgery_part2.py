import os

dash_js = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js"
with open(dash_js, "r", encoding="utf-8") as f: dash = f.read()

# Make sure we don't duplicate
if 'id="reply-files"' not in dash:
    # Find the textarea in viewIssue where users reply 
    old_reply_html = """          <div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--color-border)">
            <strong>Add Note / Update</strong>
            <textarea id="issue-reply" class="form-control" rows="3" placeholder="Type your message..." style="margin-top:8px;resize:none"></textarea>
            <button class="btn-primary" style="margin-top:10px;width:100%" onclick="postIssueUpdate('${issue.id}')"><i class="fas fa-paper-plane"></i> Post Update</button>
          </div>"""
    
    new_reply_html = """          <div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--color-border)">
            <strong>Add Note / Update</strong>
            <textarea id="issue-reply" class="form-control" rows="3" placeholder="Type your message..." style="margin-top:8px;resize:none"></textarea>
            <input type="file" id="reply-files" class="form-control" multiple accept="image/*,.pdf,.doc,.docx" style="margin-top:8px" />
            <button class="btn-primary" style="margin-top:10px;width:100%" onclick="postIssueUpdate('${issue.id}')"><i class="fas fa-paper-plane"></i> Post Update</button>
          </div>"""
    
    dash = dash.replace(old_reply_html, new_reply_html)
    
    # Also update postIssueUpdate to capture base64 and append to timeline/attachments
    old_post_update = """function postIssueUpdate(id) {
  const note = document.getElementById('issue-reply').value.trim();
  if(!note) return;
  const issue = GLOBAL_ISSUES.find(i => i.id === id);
  if(issue) {
    issue.timeline.push({ 
      date: new Date().toISOString(), 
      actor: currentUser.name, 
      role: currentUser.roleLabel, 
      note: note 
    });
    issue.updated = new Date().toISOString();
    saveIssues(GLOBAL_ISSUES);
    triggerLiveReRender();
    // Refresh modal
    viewIssue(id);
    simulateAction('Update posted.');
  }
}"""

    new_post_update = """function postIssueUpdate(id) {
  const note = document.getElementById('issue-reply').value.trim();
  const fileInput = document.getElementById('reply-files');
  if(!note && (!fileInput || !fileInput.files.length)) return;
  
  const issue = GLOBAL_ISSUES.find(i => i.id === id);
  if(!issue) return;

  const files = fileInput && fileInput.files ? Array.from(fileInput.files) : [];
  const readers = files.map(file => {
      return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve({ name: file.name, type: file.type, size: file.size, data: e.target.result });
          reader.readAsDataURL(file);
      });
  });

  Promise.all(readers).then(attachmentsArray => {
      if(attachmentsArray.length > 0) {
          if(!issue.attachments) issue.attachments = [];
          issue.attachments = issue.attachments.concat(attachmentsArray);
      }
      
      let finalNote = note;
      if(attachmentsArray.length > 0) {
          finalNote += (note ? " " : "") + `[Attached ${attachmentsArray.length} file(s)]`;
      }
      
      issue.timeline.push({ 
        date: new Date().toISOString(), 
        actor: currentUser.name, 
        role: currentUser.roleLabel, 
        note: finalNote 
      });
      issue.updated = new Date().toISOString();
      saveIssues(GLOBAL_ISSUES);
      triggerLiveReRender();
      // Refresh modal
      viewIssue(id);
      simulateAction('Update posted.');
  });
}"""

    dash = dash.replace(old_post_update, new_post_update)

with open(dash_js, "w", encoding="utf-8") as f: f.write(dash)
print("Updated viewIssue modal and postIssueUpdate for attachments!")
