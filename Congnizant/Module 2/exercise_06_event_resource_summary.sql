-- Exercise 6: Event Resource Summary
-- Count different types of resources per event

SELECT 
    e.event_id,
    e.title as event_title,
    r.resource_type,
    COUNT(r.resource_id) as resource_count
FROM 
    Events e
LEFT JOIN 
    Resources r ON e.event_id = r.event_id
GROUP BY 
    e.event_id, e.title, r.resource_type
ORDER BY 
    e.event_id, resource_count DESC;
