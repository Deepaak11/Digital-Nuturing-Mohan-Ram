-- Exercise 13: Average Rating Per City
-- Show average event feedback rating grouped by city

SELECT 
    e.city,
    COUNT(DISTINCT e.event_id) as total_events,
    ROUND(AVG(f.rating), 2) as average_rating,
    COUNT(DISTINCT f.feedback_id) as total_feedbacks
FROM 
    Events e
LEFT JOIN 
    Feedback f ON e.event_id = f.event_id
GROUP BY 
    e.city
HAVING 
    average_rating IS NOT NULL
ORDER BY 
    average_rating DESC;
