-- Exercise 4: Peak Session Hours
-- Find sessions that occur between 10 AM and 12 PM

SELECT 
    s.session_id,
    s.title as session_title,
    e.title as event_title,
    s.start_time,
    s.end_time,
    s.speaker_name
FROM 
    Sessions s
JOIN 
    Events e ON s.event_id = e.event_id
WHERE 
    TIME(s.start_time) >= '10:00:00' 
    AND TIME(s.start_time) < '12:00:00'
ORDER BY 
    s.start_time;
