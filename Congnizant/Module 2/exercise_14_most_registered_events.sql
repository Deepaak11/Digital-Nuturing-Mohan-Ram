-- Exercise 14: Most Registered Events
-- List top 5 events with the highest number of registrations

SELECT 
    e.event_id,
    e.title as event_title,
    e.city,
    COUNT(r.registration_id) as registration_count
FROM 
    Events e
LEFT JOIN 
    Registrations r ON e.event_id = r.event_id
GROUP BY 
    e.event_id, e.title, e.city
ORDER BY 
    registration_count DESC
LIMIT 5;
