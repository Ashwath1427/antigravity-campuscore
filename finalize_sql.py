m = open('CAMPUSCORE_MASTER_SETUP.sql', 'r').read()
extra = """
-- STEP 6: PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
"""
open('CAMPUSCORE_MASTER_SETUP.sql', 'w').write(m + extra)
print("Master SQL finalized.")
