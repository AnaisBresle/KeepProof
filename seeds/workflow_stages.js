[

// Budget Approval stages (workflow_id:1)    
  {
    "id": "1",
    "workflow_id": "1",
    "name":"Request",
  "stage_order": "1",
  "role_required": "user",
    "escalation_role": "",
  },


    {
    "id": "2",
    "workflow_id": "1",
    "name":"First Level Approval",
  "stage_order": "2",
  "role_required": "supervisor",
    "escalation_role": "",
  },

    {
    "id": "3",
    "workflow_id": "1",
    "name":"Second Level Approval",
  "stage_order": "3",
  "role_required": "department_head",
    "escalation_role": "c_level",
  },

      {
    "id": "4",
    "workflow_id": "1",
    "name":"Final Approval",
  "stage_order": "4",
  "role_required": "c_level",
    "escalation_role": "",
  },

      {
    "id": "5",
    "workflow_id": "1",
    "name":"Escalated",
  "stage_order": "5",
  "role_required": "user",
    "escalation_role": "",
  },

  // Purchase stages (workflow_id:2)

 {
    "id": "6",
    "workflow_id": "2",
    "name":"Request",
  "stage_order": "1",
  "role_required": "user",
    "escalation_role": "",
  },


    {
    "id": "7",
    "workflow_id": "2",
    "name":"First Level Approval",
  "stage_order": "2",
  "role_required": "supervisor",
    "escalation_role": "",
  },

    {
    "id": "8",
    "workflow_id": "2",
    "name":"Second Level Approval",
  "stage_order": "3",
  "role_required": "department_head",
    "escalation_role": "c_level",
  },

      {
    "id": "9",
    "workflow_id": "2",
    "name":"Final Approval",
  "stage_order": "4",
  "role_required": "c_level",
    "escalation_role": "",
  },

      {
    "id": "10",
    "workflow_id": "2",
    "name":"Escalated",
  "stage_order": "5",
  "role_required": "user",
    "escalation_role": "",
  },




   {
    "id": "6",
    "workflow_id": "2",
    "name":"Request",
  "stage_order": "1",
  "role_required": "user",
    "escalation_role": "",
  },


    // Content Review stages (workflow_id:3)

    {
    "id": "11",
    "workflow_id": "3",
    "name":"Request",
  "stage_order": "1",
  "role_required": "user",
    "escalation_role": "",
  },

    {
    "id": "12",
    "workflow_id": "3",
    "name":"Team Feedback",
  "stage_order": "2",
  "role_required": "'team_member",
    "escalation_role": "c_level",
  },

      {
    "id": "13",
    "workflow_id": "3",
    "name":"Feedback Signoff",
  "stage_order": "3",
  "role_required": "feedback_manage",
    "escalation_role": "",
  },

      {
    "id": "14",
    "workflow_id": "3",
    "name":"Feedback Resolution",
  "stage_order": "4",
  "role_required": "user",
    "escalation_role": "",
  },

     {
    "id": "15",
    "workflow_id": "3",
    "name":"Compliance Review",
  "stage_order": "5",
  "role_required": "compliance",
    "escalation_role": "",
  },


   {
    "id": "16",
    "workflow_id": "3",
    "name":"Final Approval",
  "stage_order": "6",
  "role_required": "department_head",
    "escalation_role": "",
  },


]

