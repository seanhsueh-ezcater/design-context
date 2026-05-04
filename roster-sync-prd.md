# Roster Sync PRD

## Objective
Deliver an iteration on the Concur-ezCater integration that allows admins to selectively sync groups of users from Concur into ezCater based on configurable mappings, reducing manual user management and ensuring ordering access aligns with the customer's organizational structure.

## The Problem
The current Concur Enterprise roster sync is all-or-nothing. Either every user from Concur is added to ezCater, or none are. Some accounts will not turn on roster sync until selective grouping is supported.

## Who is Impacted
- International companies (Bayer confirmed, Amgen/Abbott/J&J/GSK potential)
- Companies who limit who can order (Cengage, Pfizer, Abbvie)
- ezCater: reduce HubSpot/Iterable costs, improve data accuracy

## Size of the Opportunity
- $70K in bookings in 48 days from Bayer's roster sync → extrapolates to $532K/year
- Phase 1 US-only: $4M annual GMV
- Phase 2 Custom Configurations: $4.4M annual GMV

## Requirements

### Phase 1 — US Only
- Inform admin that only US employees will be synced.
- During sync: only include users whose country attribute is US.

### Phase 2 — Custom Configurations
- Allow admin to select one or more Concur Spend Identity attributes (Employee Groups, Department, Cost Center, etc.)
- Allow admin to specify allowed values for each attribute via free text.
- During sync: only include users whose attributes match at least one configured combination.

## Open Questions
1. Can we preview names of their custom fields? How quickly?
2. Can we get a count of matching users without performing the sync?
3. What attribute types can we use? Which are required fields in Concur?

## Customer Research
- Pfizer wants to use expense policy or employee group
