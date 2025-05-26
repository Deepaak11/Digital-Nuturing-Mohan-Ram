-- Exercise 23: Registration Trends (Month-wise)
-- Show month-wise registration counts for the current year

SELECT 
    DATE_FORMAT(registration_date, '%Y-%m') as month,
    COUNT(registration_id) as registration_count,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(DISTINCT event_id) as unique_events
FROM 
    Registrations
WHERE 
    YEAR(registration_date) = YEAR(CURDATE())
GROUP BY 
    DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY 
    month;
