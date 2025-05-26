-- Exercise 24: Average Session Duration
-- Calculate average duration (in minutes) of sessions per event

SELECT 
    e.event_id,
    e.title as event_title,
    COUNT(s.session_id) as session_count,
    SEC_TO_TIME(AVG(TIME_TO_SEC(TIMEDIFF(s.end_time, s.start_time)))) as avg_duration,
    ROUND(AVG(TIME_TO_SEC(TIMEDIFF(s.end_time, s.start_time)))/60, 2) as avg_duration_minutes
FROM 
    Events e
LEFT JOIN 
    Sessions s ON e.event_id = s.event_id
GROUP BY 
    e.event_id, e.title
HAVING 
    session_count > 0
ORDER BY 
    avg_duration_minutes DESC;
