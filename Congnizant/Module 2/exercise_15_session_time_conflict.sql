-- Exercise 15: Session Time Conflict
-- Find sessions under the same event that have overlapping time ranges

SELECT 
    e.event_id,
    e.title as event_title,
    s1.session_id as session1_id,
    s1.title as session1_title,
    s1.start_time as session1_start,
    s1.end_time as session1_end,
    s2.session_id as session2_id,
    s2.title as session2_title,
    s2.start_time as session2_start,
    s2.end_time as session2_end
FROM 
    Events e
JOIN 
    Sessions s1 ON e.event_id = s1.event_id
JOIN 
    Sessions s2 ON e.event_id = s2.event_id
    AND s1.session_id < s2.session_id  -- Avoid duplicate pairs
    AND s1.start_time < s2.end_time
    AND s1.end_time > s2.start_time  -- Check for time overlap
ORDER BY 
    e.event_id, s1.start_time;
