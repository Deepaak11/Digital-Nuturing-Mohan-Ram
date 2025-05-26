-- Exercise 22: Duplicate Registrations
-- Detect users registered multiple times for the same event

SELECT 
    r1.user_id,
    u.full_name,
    r1.event_id,
    e.title as event_title,
    COUNT(r1.registration_id) as registration_count,
    GROUP_CONCAT(DISTINCT r1.registration_date ORDER BY r1.registration_date SEPARATOR ', ') as registration_dates
FROM 
    Registrations r1
JOIN 
    Users u ON r1.user_id = u.user_id
JOIN 
    Events e ON r1.event_id = e.event_id
GROUP BY 
    r1.user_id, u.full_name, r1.event_id, e.title
HAVING 
    COUNT(r1.registration_id) > 1
ORDER BY 
    registration_count DESC, r1.user_id;
