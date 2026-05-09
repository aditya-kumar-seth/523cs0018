# Notification System Design

## Stage 1: REST API Endpoints
- `GET /notifications` - Fetch top 10 unread notifications (sorted by priority + recency)
- `POST /notifications/:id/read` - Mark notification as read
- `POST /notifications` - Create new notification

## Stage 2: Database Design
Use PostgreSQL with proper indexes on:
- `student_id`, `isRead`, `createdAt`, `priority`

## Stage 3-6: Scalability Improvements
- Added `priority` column (1-100)
- Used Redis for caching top notifications
- Background jobs for email sending
- Rate limiting for high traffic
<img width="788" height="303" alt="Screenshot 2026-05-09 120437" src="https://github.com/user-attachments/assets/dfd9769d-6609-4501-a01e-cfd5570506c8" />

**Recommended Architecture**: Priority Queue + Materialized Views + Background Workers for handling 50,000+ notifications efficiently.
