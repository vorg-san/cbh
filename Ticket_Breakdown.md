# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

# Ticket 1

Create new database table `AgentFacility` to hold information of each agent in each facility. It should have the following fields:
 - `id` (primary key autoincrement)
 - `agent_id` (foreign key to table Agent, not null)
 - `facility_id` (foreign key to table Facility, not null)
 - `custom_id` (number, not null)
 - `hidden_at` (timestamp, null)
 - `created` (timestamp, not null)
 - `created_by` (foreign key to user table, not null)

# Ticket 2 

1. Alter the function that creates agents in our database so that whenever a new agent is inserted in the `Agent` table, then it is also inserted in `AgentFacility` table, one record for each facility we have (`custom_id` should be the internal id of the agent).
2. Alter the function that creates facility in our database so that whenever a new facility is inserted in the `Facility` table, then it is also inserted in `AgentFacility` table, one record for each agent we have (`custom_id` should be the internal id of the agent).

# Ticket 3

Fill the database table `AgentFacility` with all current agents in all facilities that we have, so that each agent must have one record here for each facility (`custom_id` should be the internal id of the agent).

# Ticket 4

Implement a new functionality in the system so that Facility managers can assign custom ids in their Facility to each agent. 
Managers should see a list of all employees and be able to assign a number to them. If they change the number of an agent that already had a number assigned to them, you should set hidden_at to the timestamp that the new number was informed and then add another record for the new number, this way we can verify older reports that might have had other `custom_id` for a `agent_id` in the past.  This way, multiple custom ids can be created for the same agent in the same facility, however only the last one of them will have hidden_at null and we will always use this filter when querying this table.

# Ticket 5

Alter the `getShiftsByFacility` function to provide the new `custom_id` field instead of the agent internal id. This means that you will need to modify the database data fetch to consider the new table `AgentFacility` where for any given `facility_id` and `agent_id` we will have at most one `custom_id` that has `hidden_at` null. 
There is a possibility of any given agent to not have a record in the 
