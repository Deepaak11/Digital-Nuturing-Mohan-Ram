-- Exercise 12: Event with Max Sessions
-- Identify the event with the most sessions

WITH SessionCounts AS (
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
)
SELECT 
    event_id,
    event_title,
    session_count
FROM 
    SessionCounts
WHERE 
    session_count = (SELECT MAX(session_count) FROM SessionCounts);
