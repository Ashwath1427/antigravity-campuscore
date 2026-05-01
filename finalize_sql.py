import requests
import json

# CAMPUS CORE – SQL FINALIZER
# This script verifies the Supabase connection and provides instructions for SQL application.

SUPABASE_URL = "https://bzqqgurlqunpzgdavedz.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cXFxdXJscXF1bnB6Z2RhdmVkeiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE0NDI5NjcwLCJleHAiOjIwMzAwMDU2NzB9.9hJ6K5m_XqPfGvLz8JxQ5sYfVhQh2aL8J9m9qF2pW7k"

def verify_connection():
    print("--- CampusCore Supabase Connection Verifier ---")
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}"
    }
    
    try:
        # Try to fetch from a standard table to test connection
        response = requests.get(f"{SUPABASE_URL}/rest/v1/cc_users?select=*", headers=headers)
        if response.status_code == 200:
            print("[SUCCESS] Connection established successfully.")
            print(f"[INFO] Tables found. User count: {len(response.json())}")
        elif response.status_code == 404:
            print("[NOTICE] Connection worked, but 'cc_users' table was not found.")
            print("[ACTION] Please apply the 'campuscore_schema.sql' in the Supabase SQL Editor.")
        else:
            print(f"[ERROR] Connection failed with status code: {response.status_code}")
            print(f"[DETAILS] {response.text}")
    except Exception as e:
        print(f"[FATAL] Could not connect to Supabase: {str(e)}")

if __name__ == "__main__":
    verify_connection()
