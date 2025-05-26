-- Exercise 2: Top Rated Events
-- Show events with average feedback rating >= 4

SELECT 
    e.event_id,
    e.title,
    ROUND(AVG(f.rating), 2) as average_rating,
    COUNT(f.feedback_id) as feedback_count
FROM 
    Events e
JOIN 
    Feedback f ON e.event_id = f.event_id
GROUP BY 
    e.event_id, e.title
HAVING 
    AVG(f.rating) >= 4
ORDER BY 
    average_rating DESC;
