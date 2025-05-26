-- Exercise 18: Resource Availability Check
-- Events that don't have any attached resources

SELECT 
    e.event_id,
    e.title as event_title,
    e.start_date,
    e.end_date
FROM 
    Events e
LEFT JOIN 
    Resources r ON e.event_id = r.event_id
WHERE 
    r.resource_id IS NULL
ORDER BY 
    e.start_date;
