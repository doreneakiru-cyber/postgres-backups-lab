#!/bin/bash

# ==============================================================================
# Hands-On Lab: Backups, Point-in-Time Recovery, and Replication
# ==============================================================================

# --- Step 1: Take and Verify a Logical Backup ---
# Create directory for backups
mkdir -p ~/backups

# Take a custom-format dump of the bootcamp database
pg_dump -Fc -f ~/backups/bootcamp.dump bootcamp

# Verify dump content header
pg_restore --list ~/backups/bootcamp.dump | head

# Restore into a verification database to test integrity
createdb bootcamp_check && pg_restore -d bootcamp_check ~/backups/bootcamp.dump

# --- Step 2: Enable WAL Archiving & Base Backup ---
# Configuration additions required in postgresql.conf:
#   wal_level = replica
#   archive_mode = on
#   archive_command = 'cp %p /home/$USER/backups/wal/%f'

# Create folder for WAL segment files
mkdir -p ~/backups/wal

# Restart service to apply configuration updates
sudo systemctl restart postgresql

# Perform physical base backup with WAL archive inclusion
pg_basebackup -D ~/backups/base -Ft -z -Xs -P

# --- Step 3: Simulate Disaster and Point-in-Time Recovery (PITR) ---
# Record target timestamp before simulated failure:
#   SELECT now();  -- e.g., '2026-09-28 15:30:00'
# Simulate data loss:
#   DELETE FROM students;

# Target recovery settings added to postgresql.conf:
#   restore_command = 'cp ~/backups/wal/%f %p'
#   recovery_target_time = '2026-09-28 15:30:00'

# --- Step 4: Set Up a Streaming Standby ---
# On primary database instance:
#   CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'reppass';
#
# Access rule in pg_hba.conf:
#   host replication replicator 127.0.0.1/32 md5

# Provision standby node using pg_basebackup
pg_basebackup -h 127.0.0.1 -U replicator -D ~/standby -R -P

# --- Step 5: Check Replication Status ---
# Verification SQL query on primary instance:
# SELECT application_name, state, pg_wal_lsn_diff(sent_lsn, replay_lsn) AS lag_bytes 
# FROM pg_stat_replication;
