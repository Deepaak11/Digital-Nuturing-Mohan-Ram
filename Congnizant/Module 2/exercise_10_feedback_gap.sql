-- Exercise 10: Feedback Gap
-- Find events that have users registered but no feedback submitted

SELECT DISTINCT
    e.event_id,
    e.title as event_title,
    COUNT(DISTINCT r.user_id) as registered_users,
    COUNT(DISTINCT f.user_id) as feedback_submissions
FROM 
    Events e
LEFT JOIN 
    Registrations r ON e.event_id = r.event_id
LEFT JOIN 
    Feedback f ON e.event_id = f.event_id AND r.user_id = f.user_id
GROUP BY 
    e.event_id, e.title
HAVING 
    COUNT(DISTINCT r.user_id) > 0 
    AND (COUNT(DISTINCT f.user_id) = 0 OR COUNT(DISTINCT f.user_id) < COUNT(DISTINCT r.user_id))
ORDER BY 
    registered_users DESC;
