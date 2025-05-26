-- Exercise 5: Most Active Cities
-- Display top cities by user registration count

SELECT 
    u.city,
    COUNT(DISTINCT u.user_id) as user_count,
    COUNT(r.registration_id) as registration_count
FROM 
    Users u
LEFT JOIN 
    Registrations r ON u.user_id = r.user_id
GROUP BY 
    u.city
ORDER BY 
    registration_count DESC, user_count DESC;
