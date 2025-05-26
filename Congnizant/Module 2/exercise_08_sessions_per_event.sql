-- Exercise 8: Sessions Per Event
-- Count number of sessions per event

SELECT 
    e.event_id,
    e.title as event_title,
    COUNT(s.session_id) as session_count
FROM 
    Events e
LEFT JOIN 
    Sessions s ON e.event_id = s.event_id
GROUP BY 
    e.event_id, e.title
ORDER BY 
    session_count DESC;
