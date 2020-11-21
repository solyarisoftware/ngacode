FIREBIRD TESTS

https://github.com/hgourvest/node-firebird/issues/221#issuecomment-671792450



$ isql-fb
Use CONNECT or CREATE DATABASE to specify a database
SQL> quit;
$  sudo vi /etc/firebird/3.0/firebird.conf
$ sudo systemctl status firebird3.0
● firebird3.0.service - Firebird Database Server ( SuperServer )
   Loaded: loaded (/lib/systemd/system/firebird3.0.service; enabled; vendor preset: enabled)
   Active: inactive (dead)
$ sudo systemctl restart firebird3.0
$ sudo systemctl status firebird3.0
● firebird3.0.service - Firebird Database Server ( SuperServer )
   Loaded: loaded (/lib/systemd/system/firebird3.0.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2020-08-09 12:31:21 CEST; 6s ago
  Process: 22816 ExecStart=/usr/sbin/fbguard -pidfile /run/firebird3.0/default.pid -daemon -forever (code=exited, status=0/SUCCESS)
 Main PID: 22817 (fbguard)
    Tasks: 5 (limit: 4915)
   CGroup: /system.slice/firebird3.0.service
           ├─22817 /usr/sbin/fbguard -pidfile /run/firebird3.0/default.pid -daemon -forever
           └─22818 /usr/sbin/firebird

Aug 09 12:31:21 ITD-Giorgio-Robino-Laptop systemd[1]: Starting Firebird Database Server ( SuperServer )...
Aug 09 12:31:21 ITD-Giorgio-Robino-Laptop systemd[1]: Started Firebird Database Server ( SuperServer ).
$ sudo systemctl stop firebird3.0
$ sudo systemctl status firebird3.0
● firebird3.0.service - Firebird Database Server ( SuperServer )
   Loaded: loaded (/lib/systemd/system/firebird3.0.service; enabled; vendor preset: enabled)
   Active: inactive (dead) since Sun 2020-08-09 12:31:36 CEST; 4s ago
  Process: 22816 ExecStart=/usr/sbin/fbguard -pidfile /run/firebird3.0/default.pid -daemon -forever (code=exited, status=0/SUCCESS)
 Main PID: 22817 (code=exited, status=0/SUCCESS)

Aug 09 12:31:21 ITD-Giorgio-Robino-Laptop systemd[1]: Starting Firebird Database Server ( SuperServer )...
Aug 09 12:31:21 ITD-Giorgio-Robino-Laptop systemd[1]: Started Firebird Database Server ( SuperServer ).
Aug 09 12:31:35 ITD-Giorgio-Robino-Laptop systemd[1]: Stopping Firebird Database Server ( SuperServer )...
Aug 09 12:31:36 ITD-Giorgio-Robino-Laptop systemd[1]: Stopped Firebird Database Server ( SuperServer ).
$ sudo systemctl restart firebird3.0
$ sudo systemctl status firebird3.0
● firebird3.0.service - Firebird Database Server ( SuperServer )
   Loaded: loaded (/lib/systemd/system/firebird3.0.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2020-08-09 12:31:50 CEST; 7s ago
  Process: 22865 ExecStart=/usr/sbin/fbguard -pidfile /run/firebird3.0/default.pid -daemon -forever (code=exited, status=0/SUCCESS)
 Main PID: 22866 (fbguard)
    Tasks: 5 (limit: 4915)
   CGroup: /system.slice/firebird3.0.service
           ├─22866 /usr/sbin/fbguard -pidfile /run/firebird3.0/default.pid -daemon -forever
           └─22867 /usr/sbin/firebird

Aug 09 12:31:50 ITD-Giorgio-Robino-Laptop systemd[1]: Starting Firebird Database Server ( SuperServer )...
Aug 09 12:31:50 ITD-Giorgio-Robino-Laptop systemd[1]: Started Firebird Database Server ( SuperServer ).
$ sudo isql-fb
Use CONNECT or CREATE DATABASE to specify a database
SQL> create database "/var/lib/firebird/3.0/data/first_database.fdb" user 'SYSDBA' password 'danilo';
SQL> connect "/var/lib/firebird/3.0/data/first_database.fdb" user 'SYSDBA' password 'danilo';
Commit current transaction (y/n)?y
Committing.
Database: "/var/lib/firebird/3.0/data/first_database.fdb", User: SYSDBA
SQL> CREATE TABLE STUDENT (ID INT NOT NULL PRIMARY KEY, NAME VARCHAR(25));
SQL> show tables;
       STUDENT
SQL> INSERT INTO STUDENT VALUES (1, 'Giorgio');
SQL> INSERT INTO STUDENT VALUES (1, 'Danilo');
Statement failed, SQLSTATE = 23000
violation of PRIMARY or UNIQUE KEY constraint "INTEG_2" on table "STUDENT"
-Problematic key value is ("ID" = 1)
SQL> INSERT INTO STUDENT VALUES (2, 'Danilo');
SQL> select * from STUDENT;

          ID NAME
============ =========================
           1 Giorgio
           2 Danilo

SQL> show version
CON> ;
ISQL Version: LI-V3.0.5.33100 Firebird 3.0
Server version:
Firebird/Linux/AMD/Intel/x64 (access method), version "LI-V3.0.5.33100 Firebird 3.0"
on disk structure version 12.0
SQL> show version;
ISQL Version: LI-V3.0.5.33100 Firebird 3.0
Server version:
Firebird/Linux/AMD/Intel/x64 (access method), version "LI-V3.0.5.33100 Firebird 3.0"
on disk structure version 12.0
SQL> show databases;
Command error: show databases
SQL> show database;
Database: /var/lib/firebird/3.0/data/first_database.fdb
        Owner: SYSDBA
PAGE_SIZE 8192
Number of DB pages allocated = 196
Number of DB pages used = 184
Number of DB pages free = 12
Sweep interval = 20000
Forced Writes are ON
Transaction - oldest = 3
Transaction - oldest active = 4
Transaction - oldest snapshot = 4
Transaction - Next = 13
ODS = 12.0
Database not encrypted
Default Character set: NONE
SQL> show table;
       STUDENT
SQL> show tables;
       STUDENT
SQL> quit;
$ sudo isql-fb
Use CONNECT or CREATE DATABASE to specify a database
SQL> show version;
ISQL Version: LI-V3.0.5.33100 Firebird 3.0
Server version:
Cannot get server version without database connection
SQL> quit;
$ sudo isql-fb
Use CONNECT or CREATE DATABASE to specify a database
SQL>  connect "/var/lib/firebird/3.0/data/first_database.fdb" user 'SYSDBA' password 'danilo';
Database: "/var/lib/firebird/3.0/data/first_database.fdb", User: SYSDBA
SQL> show table students
CON> ;
There is no table STUDENTS in this database
SQL> show table student;
ID                              INTEGER Not Null
NAME                            VARCHAR(25) Nullable
CONSTRAINT INTEG_2:
  Primary key (ID)
SQL> select * from STUDENT;
SQL> select * from STUDENTS;
Statement failed, SQLSTATE = 42S02
Dynamic SQL Error
-SQL error code = -204
-Table unknown
-STUDENTS
-At line 1, column 15
SQL> select * from STUDENT;
SQL>  INSERT INTO STUDENT VALUES (2, 'Danilo');
SQL>  INSERT INTO STUDENT VALUES (2, 'Giorgio');
Statement failed, SQLSTATE = 23000
violation of PRIMARY or UNIQUE KEY constraint "INTEG_2" on table "STUDENT"
-Problematic key value is ("ID" = 2)
SQL>  INSERT INTO STUDENT VALUES (1, 'Giorgio');
SQL> select * from STUDENT;

          ID NAME
============ =========================
           2 Danilo
           1 Giorgio

SQL> commit;
SQL> select * from STUDENT;

          ID NAME
============ =========================
           2 Danilo
           1 Giorgio

SQL> sho version;
Statement failed, SQLSTATE = 42000
Dynamic SQL Error
-SQL error code = -104
-Token unknown - line 1, column 1
-sho
SQL> show version;
ISQL Version: LI-V3.0.5.33100 Firebird 3.0
Server version:
Firebird/Linux/AMD/Intel/x64 (access method), version "LI-V3.0.5.33100 Firebird 3.0"
on disk structure version 12.0
SQL> quit;

