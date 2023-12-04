

--------------------------------------------------------------- # WorkFlow Managemant---------------------------------------------------------------

Requirements:

===========Decentralization of Powers

Admin

- project: can see all projects

- tasks:

+ can see all tasks

+ Admin cannot intervene in task status (pending, on-progress, complete)

User

- user tab cannot be seen

- project:

+ can only see the projects you are joining

+ Cannot add or edit

- tasks:

+ can only see the tasks you are joining

+ cannot add or delete, only has the right to change the status of the task (pending, in-progress, complete)


//Dashboard

================= ADMIN ================

How many tasks are late?

How many tasks are waiting to be accepted?

How many tasks are in progress?

How many tasks will need to be completed in the next 3 days?

How many projects are running?

How many projects will be released in the next 7 days?

How many projects according to each priority level?

How many users have empty tasks?

How many users have tasks to complete in the next 7 days?

================== USER ================

How many projects will be released in the next 7 days?

How many tasks must be completed in the next 7 days?

Projects I am working on (List)

Tasks I am doing (List)




Technical :

 Front end : React TypeScript +Vite  ,antd,boostrap
 
 Back end:node-red,sql

Firstly install node red to 

#sudo npm install -g --unsafe-perm node-red

Then open http://127.0.0.1:1880/  

![image](https://github.com/TamHM1410/Workflow-management/assets/122521276/79b47ec8-ad0b-4d6a-ad96-6b2f8a009125)


click import and choose file BE.json to import data for back end

next,  in  the terminal run the command :

# npm run dev              ---to  run client

open localhost:5173 

Demo client side:

![image](https://github.com/TamHM1410/Workflow-management/assets/122521276/0383af00-96d6-4711-a633-4dd660e1f5bb)
 
Login page

![image](https://github.com/TamHM1410/Workflow-management/assets/122521276/717da97d-2a63-4f23-84b1-506fb4d11f0f)

Register



Login success and go to dashboard with Admin role:


![image](https://github.com/TamHM1410/Workflow-management/assets/122521276/3dfc82cf-2c7b-48b0-8a58-49398042ebb5)
![image](https://github.com/TamHM1410/Workflow-management/assets/122521276/5b085f4d-6cbe-4786-80ac-ae8b4b201205)

![image](https://github.com/TamHM1410/Workflow-management/assets/122521276/0fc65900-f496-4ea4-b7d8-03312b046924)

UserRole:
![image](https://github.com/TamHM1410/Workflow-management/assets/122521276/bf2377bd-ef4d-4698-b657-d7509ce742de)


























