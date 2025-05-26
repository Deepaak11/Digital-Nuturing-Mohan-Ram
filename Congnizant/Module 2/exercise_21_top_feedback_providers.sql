-- Exercise 21: Top Feedback Providers
-- Users who have submitted the most feedback

SELECT 
    u.user_id,
    u.full_name,
    u.email,
    COUNT(f.feedback_id) as feedback_count,
    ROUND(AVG(f.rating), 2) as average_rating
FROM 
    Users u
JOIN 
    Feedback f ON u.user_id = f.user_id
GROUP BY 
    u.user_id, u.full_name, u.email
ORDER BY 
    feedback_count DESC, average_rating DESC
LIMIT 10;
