-- Exercise 16: Unregistered Active Users
-- Users who joined recently but haven't registered for any event

SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.registration_date,
    DATEDIFF(CURDATE(), u.registration_date) as days_since_registration
FROM 
    Users u
LEFT JOIN 
    Registrations r ON u.user_id = r.user_id
WHERE 
    r.registration_id IS NULL
    AND u.registration_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
ORDER BY 
    u.registration_date DESC;
