-- Exercise 11: New Users (Last 7 Days)
-- Show daily count of users who joined in the past 7 days

SELECT 
    DATE(registration_date) as join_date,
    COUNT(user_id) as new_users_count
FROM 
    Users
WHERE 
    registration_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY 
    DATE(registration_date)
ORDER BY 
    join_date DESC;
