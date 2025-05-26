-- Exercise 20: User Engagement Index
-- For each user, calculate an engagement score = registrations + feedbacks

SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.registration_date,
    COUNT(DISTINCT r.registration_id) as registration_count,
    COUNT(DISTINCT f.feedback_id) as feedback_count,
    (COUNT(DISTINCT r.registration_id) + COUNT(DISTINCT f.feedback_id)) as engagement_score
FROM 
    Users u
LEFT JOIN 
    Registrations r ON u.user_id = r.user_id
LEFT JOIN 
    Feedback f ON u.user_id = f.user_id
GROUP BY 
    u.user_id, u.full_name, u.email, u.registration_date
ORDER BY 
    engagement_score DESC, registration_date;
