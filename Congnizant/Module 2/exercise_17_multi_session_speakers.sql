-- Exercise 17: Multi-Session Speakers
-- List speakers who are scheduled in more than one session

SELECT 
    speaker_name,
    COUNT(DISTINCT session_id) as session_count,
    GROUP_CONCAT(DISTINCT e.title ORDER BY e.title SEPARATOR ', ') as events
FROM 
    Sessions s
JOIN 
    Events e ON s.event_id = e.event_id
GROUP BY 
    speaker_name
HAVING 
    COUNT(DISTINCT session_id) > 1
ORDER BY 
    session_count DESC, speaker_name;
