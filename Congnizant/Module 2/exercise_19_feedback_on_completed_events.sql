-- Exercise 19: Feedback on Completed Events
-- Display summary of feedback (avg, min, max) for completed events

SELECT 
    e.event_id,
    e.title as event_title,
    e.city,
    e.start_date,
    e.end_date,
    COUNT(f.feedback_id) as feedback_count,
    ROUND(AVG(f.rating), 2) as average_rating,
    MIN(f.rating) as min_rating,
    MAX(f.rating) as max_rating
FROM 
    Events e
LEFT JOIN 
    Feedback f ON e.event_id = f.event_id
WHERE 
    e.status = 'completed'
GROUP BY 
    e.event_id, e.title, e.city, e.start_date, e.end_date
ORDER BY 
    e.end_date DESC;
