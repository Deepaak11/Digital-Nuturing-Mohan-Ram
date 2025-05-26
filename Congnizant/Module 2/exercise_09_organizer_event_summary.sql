-- Exercise 9: Organizer Event Summary
-- List the number of events organized by each user

SELECT 
    u.user_id,
    u.full_name as organizer_name,
    u.email,
    COUNT(e.event_id) as events_organized
FROM 
    Users u
LEFT JOIN 
    Events e ON u.user_id = e.organizer_id
GROUP BY 
    u.user_id, u.full_name, u.email
ORDER BY 
    events_organized DESC;
