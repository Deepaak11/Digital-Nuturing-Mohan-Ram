-- Exercise 25: Events Without Sessions
-- List events that don't have any sessions scheduled

SELECT 
    e.event_id,
    e.title as event_title,
    e.start_date,
    e.end_date,
    e.city,
    u.full_name as organizer_name
FROM 
    Events e
LEFT JOIN 
    Sessions s ON e.event_id = s.event_id
JOIN
    Users u ON e.organizer_id = u.user_id
WHERE 
    s.session_id IS NULL
ORDER BY 
    e.start_date;
