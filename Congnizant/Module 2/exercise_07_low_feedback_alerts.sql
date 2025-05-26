-- Exercise 7: Low Feedback Alerts
-- Show events where the average rating is < 3

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
    AVG(f.rating) < 3
ORDER BY 
    average_rating;
